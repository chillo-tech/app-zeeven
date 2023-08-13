import { capitalize } from '@/utils';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

function TablePlanItem({ contact, index }: any) {
  return (
    <Draggable draggableId={contact.publicId} index={index}>
      {(provided: any, snapshot: any) => (
        <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={classNames('mb-3', {
          'bg-app-blue text-white': snapshot.isDragging,
          'bg-white border border-gray-100': !snapshot.isDragging,
        })}
        >
          <article className="shadow-xs rouned-md cursor-pointer p-4">
            <span>{capitalize(contact.civility)}</span>
            <span className="mx-1">{capitalize(contact.firstName)}</span>
            <span className="uppercase">{contact.lastName}</span>
          </article>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}

export default TablePlanItem;
