import { Draggable } from 'react-beautiful-dnd';

export default function Section (props) {
  return (
    <Draggable key={ props.key } draggableId={ props.draggableId } index={ props.index }>
      {(provided) => (
        <li 
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
        >
          <div className='property-wrapper'>{props.content}</div>
        </li>
      )}
    </Draggable>  );
};
