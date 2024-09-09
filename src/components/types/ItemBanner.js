import { useState, useEffect} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faTrashCan, faHand, faUpDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import '../Section/Section.css';
import ModalNotify from '../ModalNotify';

export default function ItemBanner (props){
    const removeItem = (key) => {
        props.setSchema((prevSchema) => {
            const newProperties = prevSchema.properties;
            delete newProperties[key];
            return { ...prevSchema, properties: newProperties };
        })
    };
    return (
        <>
            <div className='section-gener'>
                <li key={props.keyItem}>
                    <div className='section'>
                        <div className="accordion-item section-item">
                            <h2 className="accordion-header">
                                <div className='btn-up-down'>
                                    <button className="accordion-button accordion-action" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={'#' + props.element.name + '-item'}
                                            // aria-expanded={props.show[props.element.name] ? 'true' : 'false'}
                                            aria-expanded='true'
                                            aria-controls={props.element.name + '-item'}
                                            // onClick={() => {
                                            //     props.setShow((prev) => {
                                            //         return {
                                            //             ...prev,
                                            //             [props.element.name]: !props.show[props.element.name]
                                            //         }
                                            //     });
                                            // }}
                                    >
                                        {props.element.content.props.schema.title}
                                        <i className="simple-icon-arrow-down select-icon"></i>
                                    </button>
                                    <button type="button"
                                            className='btn-action-section btn-trash'
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalNotify"
                                            // onClick={() => setSecDel(props.element.name)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                        />
                                    </button>

                                </div>

                            </h2>
                            <div id={props.element.name + '-item'}
                                 // className={props.show[props.element.name] ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'}
                                 className='accordion-collapse collapse show'
                            >
                                <div className="accordion-body">
                                    <div className='property-wrapper'>{props.element.content}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </li>
            </div>
            {/*// <ModalNotify keySection = {secDel}*/}
            {/*             removeAction = {removeSection}/>*/}
        </>

    )
}