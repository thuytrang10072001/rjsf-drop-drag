import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import './App.css'
import { useState } from 'react';
import {secInfo, secUser} from './Config';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { Column } from './components/Column/Column';
import { Section }from './components/Section/Section';

export default function App(){
  const [formData, setFormData] = useState({
    name: "Trang",
    age: 18 
  });

  const [schema, setSchema]= useState({
    type: 'object',
    title: 'React Json Schema Form',
    definitions: {
      user: secUser,
      info: secInfo
    },
    properties: {
      user: {
        $ref: '#/definitions/user'
        // type: "array",
        // items:{
        //   $ref: '#/definitions/user'
        // }
      },
      info: {
        $ref: '#/definitions/info'
      },
    },
  });

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getSecPos = (id) => {
    const keys = Object.keys(schema.properties);
    return keys.findIndex((key) => schema.properties[key].id === id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setSchema((schema) => {
      const keys = Object.keys(schema.properties);
      const originalPos = getSecPos(active.id);
      const newPos = getSecPos(over.id);

      const newKeys = arrayMove(keys, originalPos, newPos);
      const newProperties = {};
      newKeys.forEach((key) => {
        newProperties[key] = schema.properties[key];
      });

      return {
        ...schema,
        properties: newProperties,
      };
    });
  };

  function ObjectFieldTemplate(props) {
    const propertyKeys = Object.keys(props.properties || {});
    const sectionKeys = props.properties.map((element, index) => `section-${index}`);
    console.log(props.title == 'React Json Schema Form')
    return (
      <div>
        <h3>{props.title}</h3>
        <div>{props.description}</div>
        {props.title == 'React Json Schema Form'?
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={sectionKeys} strategy={verticalListSortingStrategy}>
              {props.properties.map((element, index) => (
                <Section id={sectionKeys[index]} content={element.content} />)
              )}
            </SortableContext>
          </DndContext>
          :
          (props.properties.map((element, index) => (    
            <div className='property-wrapper'>{element.content}</div>              
          )
          ))
        }

      </div>
    );
  }

  return(<div style={form} > 
    <div style={listButton}>
      <button onClick={() => addSection('#/definitions/user')}>User</button>
      <button onClick={() => addSection('#/definitions/info')}>Info</button>
    </div>   
    <Form 
      schema={ schema } 
      validator={ validator } 
      templates={{ ObjectFieldTemplate }}
      />
    {/* <Test/> */}
  </div>);
}

const form = {
  width: '50%',
  marginLeft: 'auto',
  marginRight: 'auto'
}

const listButton = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '10%'
}


