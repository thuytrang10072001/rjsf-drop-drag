import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ViewSidebarOutlined } from '@mui/icons-material';
import Loading from './components/templates/Loading';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as Yup from 'yup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { schemaForm, uiCommon, uiHeroBanner, uiItemBanner, uiBanner, uiContent  } from './Config';
import ObjectFieldForm from './components/templates/ObjectFieldForm';
import { createPage } from './api/PageApi';
import { listSection } from './api/SectionApi';
import ModalAddSection from './components/ModalAddSection';
import { TextField, SwitchField, SelectSingleField, ImageField, LinkForm, DatePicker, CkEditorField } from './components/fields';
import { UrlHelper,SchemaHelper, Helper } from './utils'
import { customValidate, ErrorListTemplate, transformErrors } from './components/templates/Validate';
import { generateYupSchema } from './components/yup';
import Common from './components/templates/Common';
import { useLoading } from './hooks/LoadingContext';

export default function Page() {
    const [formData, setFormData] = useState({});
    const { startLoading, stopLoading } = useLoading();
    const [selectedValues, setSelectedValues] = useState([]);
    const [schema, setSchema] = useState(schemaForm);
    const [totalAddSec, setTotalAddSec] = useState({});
    const [statisticalData, setStatisticalData] = useState({
        creation_date: '',
        author: ''
    })
    const [validationConfig, setValidationConfig] = useState({
        content: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    required: 'Vui lòng nhập tiêu đề trang'
                }
            }
        },
        // banner: {
        //     type: "object",
        //     properties:{
        //         link: {
        //             type: "object",
        //             test: "Vui lòng chọn đường dẫn!",
        //             required: "Vui lòng chọn đường dẫn!"
        //         }
        //     }
        // }
    })
    const [validationSchema, setValidationSchema] = useState(Yup.object().shape(generateYupSchema(validationConfig)));
    const [uiSchema, setUiSchema] = useState({
        common: uiCommon,
        content: uiContent,
        banner: uiBanner
    })
    const [showSections, setShowSections] = useState({
        // common: true,
        content: true,
        banner: true
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
    });
    const formRef = useRef(null);
    const [dataCommon, setDataCommon] = useState({
        is_home_page: 0,
        status: 1,
        public_date: ''
    });
    const [langCurrent, setLangCurrent] = useState('vi');
    const [langDatas, setLangDatas] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [maxUpload, setMaxUpload] = useState(null)
    const [isOpenTab, setIsOpenTab] = useState(false);

    const tabCommon = () => {
        setIsOpenTab(!isOpenTab);
        setFormData(formDataRef.current);
    }

    function openModalAddSection(){
        setIsOpen(true);
    }

    function closeModalAddSection() {
        setIsOpen(false);
    }

    function handleSubmitAdd (event) {
        event.preventDefault();
        selectedValues.map((item, index) => {
            let section =  sections.filter(val => val.section_key == item)[0];
            let definition = '#/definitions/' + section.section_key;
            let id = Helper.generateRandomId(10);
            SchemaHelper.updateTotalAddSec(section.section_key, setTotalAddSec, totalAddSec);
            SchemaHelper.addSection(definition, section, id, setUiSchema, setShowSections, setSchema, setCheckSections, setValidationConfig, setValidationSchema);
        })
        setSelectedValues([]);
        setFormData(formDataRef.current);
        closeModalAddSection();
    };

    function handleCancelAdd () {
        selectedValues.map((item, index) => {
            SchemaHelper.updateCheckSec(item, false, setCheckSections);
        })
        setSelectedValues([]);
    }

    const handleSubmit = async () =>  {
        startLoading();
        let page = {
            template: "index",
        };
        // Object.keys(langDatas).forEach((keyLangCode, index) => {
        //     const result = [];
        //     Object.keys(schema.properties).forEach((sectionKey, index) => {
        //         const pageSectionKey = generateRandomId(10);
        //         let formattedSection = {}
        //         if (sectionKey !== "common") {
        //             const sectionData = data[keyLangCode][sectionKey] || {};
        //             formattedSection = {
        //                 section_key: sectionKey,
        //                 page_sections: [
        //                     {
        //                         page_section_key: pageSectionKey,
        //                         ordering: index + 1,
        //                         data: sectionData
        //                     }
        //                 ]
        //             };
        //             result.push(formattedSection);
        //         } else {
        //             const sectionData = data[keyLangCode][sectionKey] || {};
        //
        //             page.page_data = {
        //                 ...page.page_data,
        //                 [keyLangCode]: {
        //                     url_key: data[keyLangCode].common.url_key,
        //                     title: data[keyLangCode].common.title,
        //                     status: data[keyLangCode].common.status,
        //                     public_date: data[keyLangCode].common.public_date
        //                 }
        //             }
        //         }
        //         if(result){
        //             page.page_data[keyLangCode].sections = result;
        //         }else{
        //             page.page_data[keyLangCode].sections = {};
        //         }
        //     });
        // })
        const data = formDataRef.current;
        const result = [];

        page.is_home_page = dataCommon.is_home_page;
        page.public_date = dataCommon.public_date;
        page.status = dataCommon.status;

        Object.keys(schema.properties).forEach((sectionKey, index) => {
            let formattedSection = {}

            if(sectionKey == "content"){
                const sectionData = data[sectionKey] || {};
                const url_bind = UrlHelper.bindUrlKey(data.content.title, data.content.url_key);
                page.page_data = {
                    vi : {
                        url_key: url_bind,
                        title: UrlHelper.encodeHTML(data.content.title),
                        status: data.content.status? 1 : 0,
                        meta_image: data.content.meta_image[0]
                    }
                }
            }else{
                const section_key = schema.properties[sectionKey].$ref.split('#/definitions/')[1];
                const sectionData = data[sectionKey] || {};
                formattedSection = {
                    section_key: section_key,
                    page_sections: [
                        {
                            page_section_key: sectionKey,
                            ordering: index + 1,
                            data: sectionData
                        }
                    ]
                };
                result.push(formattedSection);
            }
        });

        if(result.length > 0){
            page.page_data.vi.sections = result;
        }else{
            page.page_data.vi.sections = [];
        }

        try {
            let status = await handleCreatePage(page);
            if(status) {
                window.location.href = process.env.REACT_APP_PAGE_LIST;
            }else{
                console.log("failed!");
            }
        }catch (e) {
            console.log(e.message);
        }finally {
            setTimeout(stopLoading(), 3000);
        }
    }

    const handleChange = (e) => {
        formDataRef.current = e.formData;
    };

    const handleCreatePage = async (data) => {
        let result = await createPage(data);
        if (result) {
            return result.success
        }
    }

    const editPageDetail = (data_json) => {
        const res = JSON.parse(data_json);
        const common = res.page.common[0];
        const content = res.page.data;
        let dataDefault = {}
        Object.keys(content).map(key => {
            const listSections = content[key].sections;
            if(key == langCurrent){
                setStatisticalData({
                    creation_date: common.creation_date,
                    author: common.full_name
                })
                setDataCommon({
                    public_date: common.public_date,
                    status: common.status,
                    is_home_page: common.is_home_page,
                });
                dataDefault = {
                    content: {
                        status: content[key].status,
                        title: UrlHelper.decodeHTML(content[key].title),
                        url_key: UrlHelper.decodeHTML(content[key].url_key),
                        meta_image: content[key].meta_image?[content[key].meta_image, content[key].path + '.' + content[key].extension] : []
                    }
                }
            }

            const dataSection = {};
            if(listSections){
                listSections.map((section, index) => {
                    const data_section = JSON.parse(section.data);
                    const id = section.page_section_key;
                    if(key == langCurrent){
                        const section_json = JSON.parse(section.attributes);
                        const section_key = section_json.section_key;
                        let definition = '#/definitions/' + section_key;
                        SchemaHelper.addSection(definition, section_json, id, setUiSchema, setShowSections, setSchema, setCheckSections, setValidationConfig, setValidationSchema);
                        SchemaHelper.updateTotalAddSec(section_key, setTotalAddSec, totalAddSec);
                        dataDefault[id]= data_section;
                    }
                    dataSection[id] = data_section;
                })
            }

            setLangDatas((prev) => {
                return ({
                    ...prev,
                    [key]: {
                        common:{
                            public_date: common.public_date,
                            status: common.status,
                            is_home_page: common.is_home_page,
                            // creation_date: data.common.creation_date
                        },
                        content: {
                            title: UrlHelper.decodeHTML(content[key].title),
                            url_key: UrlHelper.decodeHTML(content[key].url_key),
                            meta_image: content[key].meta_image?[content[key].meta_image, content[key].path + '.' + content[key].extension] : []
                        },
                        ...dataSection
                    }
                })
            })
        })
        setFormData(dataDefault);
        formDataRef.current = dataDefault;
    }

    const getListSection = async () => {
        const rs = await listSection();
        if(!rs.success){
            return;
        }else{
            setSections([]);
            setCheckSections({});
            rs.data.map((item, index) => {
                const section = JSON.parse(item.attributes);

                setSections((prevSection) => {
                    return [...prevSection, section]
                })

                SchemaHelper.updateCheckSec(section.section_key, false, setCheckSections);

                setSchema((prev) => {
                    return {
                        ...prev,
                        definitions: {
                            ...prev.definitions,
                            [section.section_key]: section
                        }
                    }
                })

                setTotalAddSec((prev) => {
                    return {
                        ...prev,
                        [section.section_key]: 0
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
            if(window.data_json){
                editPageDetail(window.data_json);
            }
            if(window.data_max_upload){
                setMaxUpload(window.data_max_upload);
            }
        }
        setTimeout(stopLoading(), 3000);
    }

    const handleOnDragEnd = (result) => {
        setFormData(formDataRef.current);
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

    useEffect(() => {
        startLoading();

        getListSection();

        const handleButtonClick =  () => {
            formRef.current.submit()
        };
        document.addEventListener('buttonClicked', handleButtonClick);
        return () => {
            document.removeEventListener('buttonClicked', handleButtonClick);
        };
    }, []);

    return (
        <>
            <Loading />
            <div className="section-form-tab">
                <Tabs
                    defaultActiveKey="content"
                    id="uncontrolled-tab-example"
                >
                    <Tab eventKey="content" title="Nội dung" tabClassName='external-tab'>
                        <div className='row'>
                            <div className='form-rjsf'>
                                <Tabs>
                                    <Tab eventKey="vi" title="Tiếng Việt">
                                        <div className='col-12 mt-3'>
                                            <Form
                                                ref={formRef}
                                                onSubmit={handleSubmit}
                                                key={`${JSON.stringify(schema)}-${JSON.stringify(showSections)}`}
                                                schema={schema}
                                                validator={validator}
                                                customValidate={customValidate(validationSchema)}
                                                templates={{
                                                    ObjectFieldTemplate: (props) => (<ObjectFieldForm {...props}
                                                                                                      showSections={showSections}
                                                                                                      setShowSections={setShowSections}
                                                                                                      openModalAddSection={openModalAddSection}
                                                                                                      setSchema={setSchema}
                                                                                                      schema={schema}
                                                                                                      setValidationConfig={setValidationConfig}
                                                                                                      setValidationSchema={setValidationSchema}
                                                                                                      setTotalAddSec={setTotalAddSec}
                                                                                                      totalAddSec={totalAddSec}
                                                                                                      handleOnDragEnd={handleOnDragEnd}
                                                                                                      isOpenTab={isOpenTab}
                                                                                                      updateData={statisticalData}
                                                                                                      setFormData = {setFormData}
                                                                                                      formRef = {formDataRef}/>),
                                                    ErrorListTemplate
                                                }} uiSchema={uiSchema}
                                                formData={formData}
                                                transformErrors={transformErrors}
                                                fields={{
                                                    textField: TextField,
                                                    switchField: SwitchField,
                                                    selectSingleField: SelectSingleField,
                                                    imageField: (props) => (<ImageField {...props} maxUpload = {maxUpload}/>),
                                                    linkForm: LinkForm,
                                                    datePicker: DatePicker,
                                                    ckEditor: CkEditorField
                                                }}
                                                onChange={handleChange}
                                            >
                                                {/*<button type="submit" className="btn btnPrimary">Thêm đường dẫn</button>*/}
                                            </Form>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="en" title="Tiếng Anh">
                                        Tab content for Profile
                                    </Tab>
                                </Tabs>
                            </div>
                            {isOpenTab ?
                                <div className='col-3' style={{borderLeft: '1px solid #ddd'}}>
                                    <Common statisticalData={statisticalData} data = {dataCommon} setData = {setDataCommon}/>
                                </div>
                                : ('')
                            }
                        </div>
                    </Tab>
                    <Tab eventKey="restore" title="Khôi phục" tabClassName='external-tab'>
                        Tab content for Profile
                    </Tab>
                </Tabs>
                <button type="button"
                        className='tabs-icon'
                        onClick={tabCommon}
                >
                    {/*<FontAwesomeIcon*/}
                    {/*    icon={faTableColumns}*/}
                    {/*/>*/}
                    <ViewSidebarOutlined  sx={{ fontSize: 24}}/>
                </button>
                <ModalAddSection
                    show={isOpen}
                    closeModal={closeModalAddSection}
                    sections={sections}
                    handleSubmit={handleSubmitAdd}
                    checkSection={checkSections}
                    totalSec={totalAddSec}
                    // handleCancelAdd = {handleCancelAdd}
                    handleCheckboxChange={SchemaHelper.handleCheckboxChange}
                    setSelectedValues={setSelectedValues}
                    setCheckSections={setCheckSections}
                />
            </div>
        </>
    );
}





