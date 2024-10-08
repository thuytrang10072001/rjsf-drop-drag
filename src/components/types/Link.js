import { useState, useEffect, useRef} from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark, faPencil } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';

import { useLoading } from '../../hooks/LoadingContext';
import { TextField, SwitchField, SelectSingleField, ImageField, CheckBoxField } from '../fields'
import { customValidate, ErrorListTemplate, transformErrors} from '../templates/Validate';
import { generateYupSchema } from '../yup';
import { getListPageTranslation } from '../../api/PageApi';
import Helper from '../../utils/Helper';


export default function Link (props){
    const {schema, onChange, formData} = props;
    const { startLoading, stopLoading } = useLoading();
    const [uiLink, setUiLink] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [formDataLink, setFormDataLink] = useState({});
    const [url, setUrl] = useState('');
    const [link, setLink] = useState(null);
    const [listUrlModule, setUrlModule] = useState({});
    const formRef = useRef(null)
    const [moduleSelect, setModuleSelect] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);
    const [schemaLink, setSchemaLink] = useState(schema);

    function openModal(){
        setFormDataLink(formData);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function ObjectFieldTemplate(props){
        return (
            <div className='row'>
                {props?.properties?.map((element, index) =>(
                    <div className='col-12'>
                        <div className='property-wrapper field-item'>{element.content}</div>
                    </div>
                ))}
            </div>
        )
    }

    const handleSubmit = (e) => {
        onChange(e.formData);
        if(e.formData.type_link == '1'){
            setUrl(e.formData.url);
        }
        if (e.formData.type_link == '0'){
            setUrl(listUrlModule.find(val => val.value == e.formData.url_module).label);
        }
        closeModal();
    }

    const handleDelete = () => {
        setUrl('');
        onChange({});
        setFormDataLink({});
    }

    const handleClickSubmit = (e) =>{
        formRef.current.submit()
    }

    const getListUrlModule = async (key) => {


        let params = {
            key_module: key
        }
        const list = await getListPageTranslation(params);

        return list;
    }

    const updateSchemaLink = (listUrl) => {
        setSchemaLink((prevSchema) => ({
            ...prevSchema,
            dependencies: {
                type_link: {
                    oneOf: [
                        schema.dependencies_link.type_link.oneOf[0],
                        {
                            "properties": {
                                ...schema.dependencies_link.type_link.oneOf[1].properties,
                                "url_module": {
                                    ...schema.dependencies_link.type_link.oneOf[1].properties.url_module,
                                    "data": listUrl
                                },
                            }
                        }
                    ]
                }
            },
        }));
    }

    const handleOnChange = async (e) => {
        const typeLink = e.formData.type_link
        if (typeLink && typeLink != link) {
            const yupSchema = Yup.object().shape(generateYupSchema(schema.validate_section, typeLink));
            setLink(typeLink);
            setValidationSchema(yupSchema);
        }

        const module = e.formData.module;
        if(module && module != moduleSelect){
            startLoading();
            setModuleSelect(module)
            const listUrl = Helper.bindOptionsSelect(await getListUrlModule(module), '/');
            setUrlModule(listUrl)
            updateSchemaLink(listUrl);
            e.formData.url_module = '';
            setFormDataLink(e.formData);
            setTimeout(stopLoading(), 3000)
        }
    }

    const handleSelectLink = () => {
        openModal();
        setLink(null);
        setValidationSchema(Yup.object().shape(generateYupSchema(schema.validate_section)))
    }

    const handleGetData = async () => {
        startLoading()
        if(formData){
            setFormDataLink(formData);
            setLink(formData.type_link);
            setValidationSchema(Yup.object().shape(generateYupSchema(schema.validate_section, formData.type_link)))
            if(formData.type_link == '1'){
                setUrl(formData.url);
            }
            if (formData.type_link == '0'){
                const listUrl = Helper.bindOptionsSelect(await getListUrlModule(formData.module), '/');
                setUrlModule(listUrl);
                setUrl(listUrl.find(val => val.value == formData.url_module).label);
                updateSchemaLink(listUrl);
            }else{
                setSchemaLink({...schema, "dependencies": schema.dependencies_link});
            }
            formRef.current = formData
        }else{
            setSchemaLink({...schema, "dependencies": schema.dependencies_link});
        }
        setTimeout(stopLoading(), 3000);
    }

    useEffect(() => {
        setUiLink(schema.ui_section);
        handleGetData();
    }, []);

    return (
        <div className="">
        <span>{schema.label}</span>
            {url? (
                <div className="frame-add-link ms-3">
                    <div className="d-flex justify-content-between">
                        <span className="link">{url}</span>
                        <div>
                            <button type="button"
                                    className='btn-action-link'
                                    style={{color: 'grey'}}
                                    onClick={openModal}
                            >
                                <FontAwesomeIcon
                                    icon={faPencil}
                                />
                            </button>
                            <button type="button"
                                    className='btn-action-link'
                                    style={{color: 'grey'}}
                                    onClick={handleDelete}
                            >
                                <FontAwesomeIcon
                                    icon={faXmark}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <button type="button"
                        className='btn btnPrimary ms-3'
                        onClick={handleSelectLink}
                >
                    Chọn Link
                </button>
            )}
            <Modal show={isOpen} onHide = {closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3 className="modal-title">Thêm đường dẫn</h3>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form ref={formRef} key={JSON.stringify(schema)} schema={schemaLink} onSubmit={handleSubmit} onChange = {handleOnChange}
                          validator={validator} templates={{ObjectFieldTemplate, ErrorListTemplate}} formData = {formDataLink}
                          uiSchema={uiLink} customValidate = {customValidate(validationSchema)} transformErrors = {transformErrors}
                          fields={{
                              textField: TextField,
                              switchField: SwitchField,
                              selectSingleField: SelectSingleField,
                              imageField: ImageField,
                              checkboxField: CheckBoxField
                          }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btnPrimary me-2" onClick={closeModal}>Hủy</button>
                    <button type="submit" className="btn btnPrimary" onClick={handleClickSubmit}>Thêm đường dẫn</button>
                </Modal.Footer>
            </Modal>
        </div>
)
}
