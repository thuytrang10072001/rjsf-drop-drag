import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { getSubmitButtonOptions, RJSFSchema, SubmitButtonProps } from '@rjsf/utils';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';
import 'select2';


import { schemaForm, uiInfo, uiUser, uiCommon, secInfo, secUser, uiHeroBanner, uiItemBanner } from './Config';
import './App.css'
import  Section  from './components/Section/Section';
import SectionDefault from './components/Section/SectionDefault';
import {createPage, listSection} from './server/services';
import SwitchForm from './components/types/Switch';
import UploadImage from './components/types/UploadImage';
import Normal from './components/types/Normal';
import SelectSingle from './components/types/SelectSingle';
import ModalAddSection from './components/ModalAddSection';
import {TextField, SwitchField, SelectSingleField, ImageField} from './components/fields';
import TabLanguages from './components/TabLanguages';
import TemplateDefault from './components/templates/TemplateDefault';
import HeroBanner from './components/templates/HeroBanner';
import Common from './components/templates/Common';

export default function App() {
    const [formData, setFormData] = useState({});
    const [selectedValues, setSelectedValues] = useState([]);
    const [schema, setSchema] = useState(schemaForm);
    const [uiSchema, setUiSchema] = useState({
        common: uiCommon,
        hero_banner: {
            item: uiItemBanner
        }
        // user: uiUser,
        // info: uiInfo
    })
    const [showSections, setShowSections] = useState({
        common: true,
        // user: true,
        // info: false
    });
    const [sections, setSections] = useState([])
    const [checkSections, setCheckSections] = useState({});
    const formDataRef = useRef(null);
    const [itemBanner, setItemBanner] = useState({
        section_key: 'item_banner',
        title: 'Item',
        type:'object',
        properties: {
            image_desktop: {
                type: 'string',
                label: "Banner desktop",
                controlType: 'upload'
            },
            image_mobile: {
                type: 'string',
                label: "Banner mobile",
                controlType: 'upload'
            },
            link:{
                type: 'string',
                label: "Thêm đường dẫn vào bannner"
            }
        },
        ui_section: uiItemBanner
    })
    //Random key section
    function generateRandomId(length) {
        return Math.random().toString(36).substr(2, length);
    }

    function handleOnDragEnd(result, props) {
        setFormData(props.formData)
        if (!result.destination) {
            return;
        }
        const items = Object.entries(schema.properties);

        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const newProperties = Object.fromEntries(items);

        setSchema({
            ...schema,
            properties: newProperties
        });
    }

    function ObjectFieldTemplate(props) {
        console.log(props)
        const sectionKeys = props.properties.map((_, index) => `section-${index}`);
        return (
            <div key={`field-${props.idSchema.$id}`}>
                {props.idSchema.$id == 'root' ?
                    <>
                        <DragDropContext onDragEnd={(result) => handleOnDragEnd(result, props)}>
                            <Droppable droppableId="droppable-sections">
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef} className='list-item'>
                                        <div className="accordion" id="accordionParent">
                                            <SectionDefault
                                                key = {sectionKeys[0] + '-main'}
                                                keySection = {sectionKeys[0]}
                                                draggableId = {sectionKeys[0]}
                                                index = {0}
                                                element = {props.properties[0]}
                                                setSchema = {setSchema}
                                                schema = {props.properties}
                                                formData = {props.formData}
                                                setFormData = {setFormData}
                                                show = {showSections}
                                                setShow = {setShowSections}
                                            />
                                            <div>
                                                <div className='action-list-section'>
                                                    <div className='title-list-section'>Danh sách các section</div>
                                                    <button type="button"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#modalAddSection"
                                                            className='btn btnPrimary'
                                                    >
                                                        <i className="fas fa-plus"></i> Thêm Section
                                                    </button>
                                                </div>
                                                <div className='list-section'>
                                                    {props?.properties?.map((element, index) => (
                                                        index == 0 ? '' : (
                                                            <Section keySection = {sectionKeys[index]}
                                                                     key = {sectionKeys[index] + '-main'}
                                                                     draggableId = {sectionKeys[index]}
                                                                     index = {index}
                                                                     element = {element}
                                                                     setSchema = {setSchema}
                                                                     schema = {props.properties}
                                                                     formData = {props.formData}
                                                                     setFormData = {setFormData}
                                                                     show = {showSections}
                                                                     setShow = {setShowSections}
                                                            />
                                                        )
                                                    ))}
                                                </div>
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </>
                    : props.idSchema.$id == 'root_common'?
                        (<Common props = {props}/>)
                            : props.schema.section_key == 'hero_banner'?
                                (<HeroBanner props = {props}
                                            setUiSchema = {setUiSchema}
                                            setSchema = {setSchema}
                                             item = {itemBanner}
                                />)
                                :
                                    (<div className='row'>
                                        {props?.properties?.map((element, index) =>(
                                            <div className='col-6'>
                                                <div className='property-wrapper field-item'>{element.content}</div>
                                            </div>
                                        ))}
                                    </div>)
                }
            </div>
        );
    }

    function handleSubmit({formData}) {
        console.log("Form submitted with data: ", formData);
    }

    const handleCheckboxChange = (event) => {
        const {value, checked, id} = event.target;
        if (checked) {
            setSelectedValues(prevValues => [...prevValues, value]);
            setCheckSections((prev) => {
                return {...prev,  [id]: true}
            })
        } else {
            setSelectedValues(prevValues => prevValues.filter(val => val !== value));
            setCheckSections((prev) => {
                return {...prev,  [id]: false}
            })
        }
    };

    function addSection(definition, ui) {
        let id = generateRandomId(10);

        setUiSchema(prevUiSchema => ({
            ...prevUiSchema,
            [id]: ui
        }));

        setShowSections(prev => ({
            ...prev,
            [id]: true
        }));

        setSchema(prevSchema => ({
            ...prevSchema,
            properties: {
                ...prevSchema.properties,
                [id]: {
                    $ref: definition
                }
            }
        }));

        sections.map((item,index) => {
            setCheckSections(prev => ({
                ...prev,
                [item.section_key]: false
            }))
        })
    }

    function handleSubmitAdd (event) {
        event.preventDefault();
        selectedValues.map((item, index) => {
            let section =  sections[parseInt(item)];
            let definition = '#/definitions/' + section.section_key;
            addSection(definition, section.ui_section);
        })
        setSelectedValues([]);
    };

    const getListSection = async () => {
        const rs = await listSection();
        if(!rs.data.success){
            return;
        }else{
            setSections([]);
            setCheckSections({});
            rs.data.data.map((item, index) => {
                const section = JSON.parse(item.attributes);

                setSections((prevSection) => {
                    return [...prevSection, section]
                })

                setCheckSections((prev) => {
                    return {
                        ...prev,
                        [section.section_key]: false
                    }
                })

                setSchema((prev) => {
                    return {
                        ...prev,
                        definitions: {
                            ...prev.definitions,
                            [section.section_key]: section
                        }
                    }
                })

                if(section.section_key == 'hero_banner'){
                    setItemBanner(section.properties.item);
                }
                // if(section.section_key == 'common'){
                //     setSchema((prev) => {
                //         return {
                //             ...prev,
                //             definitions: {
                //                 ...prev.definitions,
                //                 [section.section_key]: section
                //             },
                //             properties:{
                //                 [section.section_key]: {
                //                     $ref: '#/definitions/common',
                //                 },
                //             }
                //         }
                //     })
                //
                //     setUiSchema(prevUiSchema => ({
                //         ...prevUiSchema,
                //         [section.section_key]: section.ui_section
                //     }));
                //
                //     setShowSections(prev => ({
                //         ...prev,
                //         [section.section_key]: true
                //     }))
                //
                // }else{
                //     setSchema((prev) => {
                //         return {
                //             ...prev,
                //             definitions: {
                //                 ...prev.definitions,
                //                 [section.section_key]: section
                //             }
                //         }
                //     })
                // }
            })
        }
    }

    const handleCreatePage = async (data) => {
        let result = await createPage(data);
        if (result) {
            return result.status
        }
    }
    useEffect(() => {
        getListSection();

        const handleButtonClick = async () => {
            const data = formDataRef.current;

            let page = {
                template: "index",
            };
            const result = [];

            Object.keys(schema.properties).forEach((sectionKey, index) => {
                const pageSectionKey = generateRandomId(10);
                let formattedSection = {}
                if (sectionKey !== "common") {
                    const sectionData = data[sectionKey] || {};
                    formattedSection = {
                        section_key: sectionKey,
                        page_sections: [
                            {
                                page_section_key: pageSectionKey,
                                ordering: index + 1,
                                data: sectionData
                            }
                        ]
                    };
                } else {
                    const sectionData = data[sectionKey] || {};
                    console.log('---------------', data.common)

                    page.is_home_page = data.home_page
                    page.public_date = data.public_date
                    page.page_data = {
                        vi: {
                            url_key: data.common.url,
                            title: data.common.title,
                            content: "abc"
                        }
                    }

                }

                result.push(formattedSection);
            });

            console.log(JSON.stringify(page, null, 2));
            let status = await handleCreatePage(page)
            console.log("=================", status)
            if(status===200) {
                window.location.reload();
            }


        };
        document.addEventListener('buttonClicked', handleButtonClick);

        return () => {
            document.removeEventListener('buttonClicked', handleButtonClick);
            // $('.select2-single-no-search').select2('destroy');
        };
    }, []);

    const handleChange = (e) => {
        formDataRef.current = e.formData;
    };

    return (<div className='form-rjsf row' style={{marginRight: 'auto', marginLeft: 'auto'}}>
        <div className='col-12'>
            <TabLanguages />
        </div>
        <div className='col-12'>
            <Form
                onSubmit = {handleSubmit}
                key = {JSON.stringify(schema)}
                schema = {schema}
                validator = {validator}
                templates = {{ObjectFieldTemplate}}
                uiSchema = {uiSchema}
                formData = {formData}
                fields = {{
                    textField: TextField,
                    switchField: SwitchField,
                    selectSingleField: SelectSingleField,
                    imageField: ImageField
                }}
                onChange = {handleChange}
            />
        </div>
        <ModalAddSection
            sections = {sections}
            handleSubmit = {handleSubmitAdd}
            handleCheckboxChange = {handleCheckboxChange}
            checkSection = {checkSections}
        />
    </div>);
}





