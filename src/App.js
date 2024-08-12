import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import './App.css'
import { useState } from 'react';
import { schemaForm } from './Config'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import  Section  from './components/Section/Section';

export default function App(){
  const [formData, setFormData] = useState({
    name: "Trang",
    age: 18 
  });

  const [schema, setSchema]= useState(schemaForm);

  //Random id section
  function generateRandomId(length) {
    
    return Math.random().toString(36).substr(2, length);
  }

  function addSection(definition){
    var id = generateRandomId(10);
    const newSchema = {
      ...schema,
      properties: {
        ...schema.properties,
        [id]: {
          $ref: definition
        }
      }
    };
    setSchema(newSchema);
  }

  const removeSection = (id) => {
    const newSchema = { ...schema };
    delete newSchema.properties[id];
    setSchema(newSchema);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) {
      return;
    }
  
    // Convert schema properties to array
    const items = Object.entries(schema.properties);

    // Execute drag-drop
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Convert array back to object
    const newProperties = Object.fromEntries(items);
    
    setSchema({
      ...schema,
      properties: newProperties
    });
  }

  function ObjectFieldTemplate(props) {
    const sectionKeys = props.properties.map((_, index) => `section-${index}`);
    return (
      <div>
        <h3>{props.title}</h3>
        <div>{props.description}</div>
        {props.title === 'React Json Schema Form'?
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable-sections">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} style={listItem}>
                  {props.properties.map((element, index) => (
                    <Section key={ sectionKeys[index] } draggableId={ sectionKeys[index] } index={ index } content={ element.content }/>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          :
          (props.properties.map((element, index) => (    
            <div className='property-wrapper' style={fieldItem}>{element.content}</div>              
          )
          ))
        }
      </div>
    );
  }

  function handleSubmit({formData}){
    console.log("Form submitted with data: ", formData);
  }

  return(<div style={form} > 
    <div style={listButton}>
      <button  type="button" className="btn btn-success" onClick={() => addSection('#/definitions/user')}>User</button>
      <button  type="button" className="btn btn-warning" onClick={() => addSection('#/definitions/info')}>Info</button>
    </div>   
    <Form 
      onSubmit={handleSubmit}
      key={JSON.stringify(schema)}        
      schema={ schema } 
      validator={ validator } 
      templates={{ ObjectFieldTemplate }}
      formData={formData}
      />
    {/* <Test/> */}
  </div>);
}

const form = {
  width: '30%',
  marginLeft: 'auto',
  marginRight: 'auto'
}

const listItem = {
  listStyle: 'none',
}

const fieldItem = {
  marginBottom: '10px'
}

const listButton = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '10%'
}


