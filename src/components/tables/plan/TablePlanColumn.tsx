
import {Droppable} from 'react-beautiful-dnd';
import TablePlanItem from './TablePlanItem';
import classNames from 'classnames';

function TablePlanColumn({ table, contacts }: any) {
  return (
    <>
      <div className="rounded-md border border-gray-100 bg-gray-100 flex flex-col flex-1">
        <Droppable droppableId={table['publicId']}>
          {
            (provided: any, snapshot: any) => (
              <div className={classNames("py-2 px-1 h-full" , {
                'bg-app-yellow ease-in': snapshot.isDraggingOver,
                'bg-none': !snapshot.isDraggingOver,
              })}
              ref={provided.innerRef} 
              {...provided.droppableProps}
              
            >
            <h3 className="text-ellipsis overflow-hidden whitespace-nowrap uppercase py-1 pl-1 font-bold text-xl">{table.name}</h3>
              {contacts.map((contact: any, key: number) => (
               <TablePlanItem contact={contact}  key={`${contact.id}-${table.id}-${key}`} index={key}/>
              ))}
              {provided.placeholder}
            </div>
            )
          }
        </Droppable>
      </div>
    </>
  );
}

export default TablePlanColumn;
