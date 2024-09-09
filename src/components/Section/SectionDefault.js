
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faTrashCan, faHand, faUpDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import './Section.css'


export default function SectionDefault (props) {
    return (
        <div className='section-gener'>
            <li>
                <div className='section'>
                    <div className="accordion-item section-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
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
                        </h2>
                        <div id={props.element.name + '-section'} className={props.show[props.element.name]? 'accordion-collapse collapse show' : 'accordion-collapse collapse'}>
                            <div className="accordion-body">
                                <div className='property-wrapper'>{props.element.content}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );
};
