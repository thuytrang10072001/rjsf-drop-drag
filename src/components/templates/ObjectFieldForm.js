import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {useState, useEffect} from 'react';
import {UnfoldLess, UnfoldMore} from '@mui/icons-material';

import Section from '../Section/Section';
import SectionDefault from '../Section/SectionDefault';
import {SchemaHelper} from '../../utils';

export default function ObjectFieldForm (options){
    const { idSchema, properties, showSections, setShowSections, openModalAddSection,
        setSchema, schema, setValidationConfig, setValidationSchema, setTotalAddSec,
        totalAddSec, handleOnDragEnd, isOpenTab, updateData, setFormData, formRef } = options
    const [isOpen, setIsOpen] = useState(false);
    const sectionKeys = properties.map((_, index) => `section-${index}`);
    const idSection = Object.keys(schema.properties);

    const handleCloseAllSection = () => {
        setFormData(formRef.current)
        idSection.filter((key) => key !== 'common' && key !== 'content').map((key) => {
            SchemaHelper.updateShowSec(key, false, setShowSections);
        })
    }

    const handleOpenAllSection = () => {
        setFormData(formRef.current)
        idSection.filter((key) => key !== 'common' && key !== 'content').map((key) => {
            SchemaHelper.updateShowSec(key, true, setShowSections);
        })
    };

    return (
        <div key={`field-${idSchema.$id}`}>
            {idSchema.$id == 'root' ?
                <div className='row'>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="droppable-sections">
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef} className='list-item'>
                                        <div className="accordion" id="accordionParent">
                                            <SectionDefault
                                                key={sectionKeys[0] + '-main'}
                                                element={properties[0]}
                                                show={showSections}
                                                setShowSections={setShowSections}
                                                updateShowSec={SchemaHelper.updateShowSec}
                                            />
                                            <div>
                                                <div className='action-list-section'>
                                                    <div className='title-list-section'>Danh sách các section</div>
                                                    <div className=''>
                                                        <button type="button"
                                                                className='btn btnSecondary'
                                                                onClick={handleCloseAllSection}
                                                        >
                                                            <UnfoldLess sx={{ fontSize: 18}}/>
                                                            Thu gọn thông tin
                                                        </button>
                                                        <button type="button"
                                                                className='btn btnSecondary'
                                                                onClick={handleOpenAllSection}
                                                        >
                                                            <UnfoldMore sx={{ fontSize: 18}}/>
                                                            Mở rộng thông tin
                                                        </button>
                                                        <button type="button"
                                                                onClick={openModalAddSection}
                                                                className='btn btnPrimary'
                                                        >
                                                            <i className="fas fa-plus"></i> Thêm Section
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='list-section'>
                                                    {properties?.map((element, index) => (
                                                        index == 0 ? '' : (
                                                            <Section keySection={sectionKeys[index]}
                                                                     key={sectionKeys[index] + '-main'}
                                                                     draggableId={sectionKeys[index]}
                                                                     index={index}
                                                                     element={element}
                                                                     setSchema={setSchema}
                                                                     show={showSections}
                                                                     setShowSections={setShowSections}
                                                                     updateShowSec={SchemaHelper.updateShowSec}
                                                                     setValidateCofig={setValidationConfig}
                                                                     setValidateSchema={setValidationSchema}
                                                                     setTotalSec={setTotalAddSec}
                                                                     totalSec={totalAddSec}
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
                </div>

                : (<div className='row'>
                            {properties?.map((element, index) =>(
                                <div className='col-6'>
                                    <div className='property-wrapper field-item'>{element.content}</div>
                                </div>
                            ))}
                        </div>)
            }
        </div>
    );
}