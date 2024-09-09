import { useState, useEffect} from 'react';

import ItemBanner from '../types/ItemBanner';
import { uiItemBanner } from '../../Config'
export default function HeroBanner (props){
    const itemKeys = props.props.properties.map((_, index) => `item-${index}`);
    const [keyBanner, setKeyBanner] = useState([]);
    const [items, setItems] = useState([]);

    function generateRandomId(length) {
        return Math.random().toString(36).substr(2, length);
    }

    function addItem(definition) {
        let id = generateRandomId(15);
        props.setUiSchema(prevUiSchema => ({
            ...prevUiSchema,
            [keyBanner]: {
                [id]: uiItemBanner
            }
        }));


        props.setSchema(prevSchema => ({
            ...prevSchema,
            properties: {
                ...prevSchema.properties,
                [keyBanner]: {
                    properties:{
                        ...prevSchema.properties[keyBanner].properties,
                        [id]: props.item
                    }
                }
            }
        }));
    }

    useEffect(() => {
        console.log(props.props)
        setKeyBanner(props.props?.idSchema?.$id?.split('root_')[1]);
        setItems(props.props?.properties);
    }, []);

    return (
        <div className="accordion" id="accordionParentBanner">
            <div>
                <div className='action-list-section'>
                    <div className='title-list-section'>Danh sách banner</div>
                    <button type="button"
                            className='btn btnPrimary'
                            onClick={() => addItem('#/definitions/item')}
                    >
                        <i className="fas fa-plus"></i> Thêm Item
                    </button>
                </div>
                <div className=''>
                    {props.props?.properties?.map((element, index) => (
                            // <Section keySection={sectionKeys[index]}
                            //          key={sectionKeys[index] + '-main'}
                            //          draggableId={sectionKeys[index]}
                            //          index={index}
                            //          element={element}
                            //          setSchema={setSchema}
                            //          schema={props.properties}
                            //          formData={props.formData}
                            //          setFormData={setFormData}
                            //          show={showSections}
                            //          setShow={setShowSections}
                            // />
                        <ItemBanner keyItem = {itemKeys[index]}
                                    element={element}
                        />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}