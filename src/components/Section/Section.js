import { Draggable } from 'react-beautiful-dnd';
import { useState, useEffect, useCallback, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faTrashCan, faHand, faUpDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import './Section.css';
import ModalNotify from '../ModalNotify';


export default function Section (props) {
    const [secDel, setSecDel] = useState('');
    const moveUp = (key) => {
        props.setSchema((prevSchema) => {
            const keys = Object.keys(prevSchema.properties);
            const index = keys.indexOf(key);
            console.log(key);
            if (index > 0) {
                [keys[index - 1], keys[index]] = [keys[index], keys[index - 1]];
                const newProperties = {};
                keys.forEach((k) => {
                    newProperties[k] = prevSchema.properties[k];
                });
                return { ...prevSchema, properties: newProperties };
            }
            return prevSchema;
        });
        props.setFormData(props.formData);
    };

    const moveDown = (key) => {
        props.setSchema((prevSchema) => {
            const keys = Object.keys(prevSchema.properties);
            const index = keys.indexOf(key);
            if (index < keys.length - 1) {
                [keys[index + 1], keys[index]] = [keys[index], keys[index + 1]];
                const newProperties = {};
                keys.forEach((k) => {
                    newProperties[k] = prevSchema.properties[k];
                });
              return { ...prevSchema, properties: newProperties };
            }
            return prevSchema;
        });
        props.setFormData(props.formData);
    };

    const removeSection = (key) => {
        props.setSchema((prevSchema) => {
            const newProperties = prevSchema.properties;
            delete newProperties[key];
            return { ...prevSchema, properties: newProperties };
        })
    };
    return (
        <>
            <div className='section-gener'>
                <Draggable draggableId={props.draggableId} index={props.index}>
                    {(provided) => (
                        <li key={props.keySection}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                        >
                            <div className='section'>
                                <div className="accordion-item section-item">
                                    <h2 className="accordion-header">
                                        <div className='btn-up-down'>
                                            <button {...provided.dragHandleProps}
                                                    type="button"
                                                    className='btn-action-section'>
                                                <FontAwesomeIcon
                                                    icon={faUpDown}
                                                />
                                            </button>
                                            <button className="accordion-button accordion-action" type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={'#' + props.element.name + '-section'}
                                                    aria-expanded={props.show[props.element.name] ? 'true' : 'false'}
                                                    aria-controls={props.element.name + '-section'}
                                                    onClick={() => {
                                                        props.setShow((prev) => {
                                                            return {
                                                                ...prev,
                                                                [props.element.name]: !props.show[props.element.name]
                                                            }
                                                        });
                                                    }}
                                            >
                                                {props.element.content.props.schema.title}
                                                <i className="simple-icon-arrow-down select-icon"></i>
                                            </button>
                                            <button type="button"
                                                    className='btn-action-section btn-trash'
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modalNotify"
                                                    onClick={() => setSecDel(props.element.name)}>
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                />
                                            </button>

                                        </div>

                                    </h2>
                                    <div id={props.element.name + '-section'}
                                         className={props.show[props.element.name] ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'}>
                                        <div className="accordion-body">
                                            <div className='property-wrapper'>{props.element.content}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </li>
                    )}
                </Draggable>
            </div>
            <ModalNotify keySection = {secDel}
                         removeAction = {removeSection}/>
        </>

    );
};
