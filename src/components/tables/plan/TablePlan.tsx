import Message from '@/components/Message';
import { add, handleError } from '@/services';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useMutation, useQueryClient } from 'react-query';
import TablePlanColumn from './TablePlanColumn';
import { useRouter } from 'next/router';

function TablePlan({ tables, slug, event, handleItemEdit}: any) {
  const router = useRouter();
  const [contacts] = useState(event.guests || []);
  const [plan] = useState(event.plan || {});
  const [data, setData] = useState({ tablesOrder: [], tables: {}, contacts: {} });
  const queryClient = useQueryClient();
  const [isError, setIsError] = useState(false);
  const mutation = useMutation({
    mutationKey: ['user-campains', slug, 'event-plan'],
    mutationFn: (item: any) =>
      add(
        `/api/backend/event/${(slug as string).substring(
          (slug as string)?.lastIndexOf('-') + 1
        )}/plan`,
        item
      ),
    onError: (error: AxiosError) => {
      setIsError(true); 
      handleError(error);
    },
    onSuccess: handleItemEdit,
  });
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const originTable = (data.tables as any)[`${source.droppableId}`];
    const destinationTable = (data.tables as any)[`${destination.droppableId}`];
    
    if (originTable === destinationTable) {
      const newContactIds = Array.from(originTable.contactIds);
      newContactIds.splice(source.index, 1);
      newContactIds.splice(destination.index, 0, draggableId);
      const newTable = {
        ...originTable,
        contactIds: newContactIds,
      };
      const updatedData = {
        ...data,
        tables: {
          ...data.tables,
          [newTable.publicId]: newTable,
        },
      };
      setData(updatedData);
      return;
    }

    let originContactIds = Array.from(originTable.contactIds);
    originContactIds = originContactIds.filter(item => item !== draggableId);
    const newOrigin = {
      ...originTable,
      contactIds: originContactIds,
    };
    const destinationContactIds = destinationTable.contactIds ? Array.from(destinationTable.contactIds) : [];
    
    destinationContactIds.push(draggableId);
    const newDestination = {
      ...destinationTable,
      contactIds: destinationContactIds,
    };

    const updatedData = {
      ...data,
      tables: {
        ...data.tables,
        [newOrigin.publicId]: newOrigin,
        [newDestination.publicId]: newDestination,
      },
    };
    setData(updatedData);
    return;
  };

  const handleSuccess = (error: any) => {
    error.preventDefault();
    mutation.reset();
    router.push('/me');
  };

  const savePlan = () => {
    mutation.mutate(data);
  };

  const pageError = (error: any) => {
    setIsError(false);
    error.preventDefault();
    mutation.reset();
  };
  useEffect(() => {
    if(plan && Object.keys(plan).length > 0) {
      setData(plan);
    } else {
      let params = {
        contacts: {},
        tables: {},
        tablesOrder: [],
      };
      const contactsParams = contacts.reduce(
        (accumulator: any, contact: any) => ({ ...accumulator, [contact.publicId]: contact }),
        {}
      );
      const tablesParams = tables.reduce(
        (accumulator: any, table: any, currentIndex: number) => ({
          ...accumulator,
          [table.publicId]: {
            ...table,
            contactIds: currentIndex == 0 ? contacts.map((contact: any) => contact['publicId']) : [],
          },
        }),
        {}
      );
  
      const tablesOrderParams = tables.map((table: any) => table.publicId);
      params = {
        ...params,
        contacts: contactsParams,
        tables: tablesParams,
        tablesOrder: tablesOrderParams,
      };
      setData(params);
    }
  }, [tables, contacts, plan]);

  return (
    <>
      {mutation.isLoading ? (
        <Message
          type="loading"
          firstMessage="Un instant"
          secondMessage="Nous enregistrons votre demande"
        />
      ) : null}
      {isError ? (
        <Message
          type="error"
          firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
          secondMessage="Veuillez prendre contact avec nous"
          action={pageError}
          actionLabel="Retourner à l'accueil"
        />
      ) : null}
      {mutation.isSuccess ? (
        <Message
          type="success"
          firstMessage="Nous avons enregistré votre demande."
          secondMessage="Vous allez recevoir sous peu les informations sur votre demande"
          action={handleSuccess}
          actionLabel="Retourner à l'accueil"
        />
      ) : null}
      {mutation.isIdle ? (
        <>
          <p className="flex items-end justify-end py-2">
            <button
              type="button"
              className="rounded-md border-app-yellow bg-app-yellow px-4 py-2 text-app-blue"
              onClick={savePlan}
            >
              Enregistrer
            </button>
          </p>
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(data.tables).length ? (
              <div className="tables grid gap-4 md:grid-cols-4">
                {data['tablesOrder'].map((tableId) => {
                  const table = data.tables[tableId];
                  let contacts: any[] = [];
                  let contactIds = table['contactIds'] || [];
                  
                  contacts = (contactIds as any[]).map((contactId: any) => (data.contacts as any)[contactId]);
                  return (
                    <TablePlanColumn key={table['publicId']} table={table} contacts={contacts} />
                  );
                })}
              </div>
            ) : null}
          </DragDropContext>
          <p className="flex items-end justify-end py-2">
            <button
              type="button"
              className="rounded-md border-app-yellow bg-app-yellow px-4 py-2 text-app-blue"
              onClick={savePlan}
            >
              Enregistrer
            </button>
          </p>
        </>
      ) : null}
    </>
  );
}

export default TablePlan;
