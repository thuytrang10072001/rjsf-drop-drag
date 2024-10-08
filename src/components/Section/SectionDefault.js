import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';

import './Section.css'

export default function SectionDefault (props) {
    const [showIcon, setShowIcon] = useState(true)
    const {element, show, updateShowSec, setShowSections} = props

    useEffect(() => {
        setShowIcon(show[element.name]);
    },[element.name])

    return (
        <div className='section-gener'>
            <li>
                <div className='section'>
                    <div className="accordion-item section-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
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
                                {showIcon?
                                    <FontAwesomeIcon
                                        icon = {faChevronUp}/>
                                    : <FontAwesomeIcon
                                        icon = {faChevronDown}
                                    />
                                }
                            </button>
                        </h2>
                        <div id={element.name + '-section'} className={show[element.name]? 'accordion-collapse collapse show' : 'accordion-collapse collapse'}>
                            <div className="accordion-body">
                                <div className='property-wrapper'>{element.content}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );
};
