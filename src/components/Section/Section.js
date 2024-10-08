import { Draggable } from 'react-beautiful-dnd';
import { useState, useEffect, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpDown, faXmark, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion';
import * as Yup from 'yup';

import {generateYupSchema} from '../yup';
import './Section.css';
import ModalDelete from '../ModalDelete';

export default function Section (props) {
    const [secDel, setSecDel] = useState('');
    const [showIcon, setShowIcon] = useState(true)
    const [secKey, setSecKey] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const {element, show, setSchema,
        setTotalSec, totalSec, draggableId,
        index, keySection, updateShowSec, setShowSections,
        setValidateCofig, setValidateSchema} = props;

    const removeSection = (key) => {
        setSchema((prevSchema) => {
            const newProperties = prevSchema.properties;
            delete newProperties[key];
            return { ...prevSchema, properties: newProperties };
        })

        setValidateCofig((prev) => {
            const newConfig = prev;
            delete newConfig[key];
            setValidateSchema(Yup.object().shape(generateYupSchema(newConfig)));
            return newConfig
        })

        setTotalSec((prev) => {
            return ({
                ...prev,
                [secKey]: totalSec[secKey] - 1
            })
        })
    };


    useEffect(() => {
       setSecDel(element.name);
       setSecKey(element.content.props.schema.section_key);
       setShowIcon(show[element.name]);
    },[element.name])

    return (
        <>
            <div className='section-gener'>
                <Draggable draggableId={draggableId} index={index}>
                    {(provided) => (
                        <li key={keySection}
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
                                                    data-bs-target={'#' + element.name + '-section'}
                                                    aria-expanded={show[element.name] ? 'true' : 'false'}
                                                    aria-controls={element.name + '-section'}
                                                    onClick={() =>
                                                        {
                                                            updateShowSec(element.name, !show[element.name], setShowSections);
                                                            setShowIcon(!showIcon)
                                                        }
                                                    }
                                            >
                                                {element.content.props.schema.title}
                                                {showIcon ?
                                                    <FontAwesomeIcon
                                                        icon={faChevronUp}/>
                                                    : <FontAwesomeIcon
                                                        icon={faChevronDown}
                                                    />
                                                }
                                            </button>
                                            <button type="button"
                                                    className='btn-action-section btn-trash'
                                                onClick={() => setIsOpen(true)}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                />
                                            </button>

                                        </div>

                                    </h2>
                                    <div id={element.name + '-section'}
                                         className={show[element.name] ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'}>
                                        <div className="accordion-body">
                                            <div className='property-wrapper'>{element.content}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </li>
                    )}
                </Draggable>
            </div>
            <ModalDelete setIsOpen = {setIsOpen}
                         isOpen = {isOpen}
                         secDel = {secDel}
                         removeAction = {removeSection}
            />
        </>

    );
};
