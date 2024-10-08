import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar} from '@fortawesome/free-solid-svg-icons';

import {TextField, SwitchField, SelectSingleField, ImageField, LinkForm, DatePicker} from '../fields'
import {customValidate, ErrorListTemplate, transformErrors} from '../templates/Validate'
import {useState, useEffect} from "react";

export default function Common (props) {
    const {statisticalData, data, setData} = props;
    const schema = {
        type: 'object',
        title: 'Thông tin chung',
        properties: {
            status: {
                type: 'boolean',
                label: "Trạng thái",
                controlType: 'select-single',
                data: [
                    {
                        "value": 0,
                        "label": "Chưa xử lý"
                    },
                    {
                        "value": 1,
                        "label": "Kích hoạt"
                    }
                ],
                default: 1
            },
            public_date: {
                type: 'string',
                label: "Ngày đăng",
                controlType: 'date',
                placeholder: "Ngày đăng"
            },
            is_home_page: {
                type: 'boolean',
                label: "Đặt làm trang chủ",
                controlType: 'switch',
                default: false
            },
        },
        ui_section: {
            public_date: {
                "ui:field": "datePicker",
            },
            status:{
                "ui:field": "selectSingleField"
            },
            is_home_page: {
                "ui:field": "switchField"
            }
        }
    }

    function ObjectFieldTemplate(props){
        return (
            <div className='row pt-3'>
                <div className='accordion-header mb-5'>
                    <h2>
                        {props.title}
                    </h2>
                </div>
                {props?.properties?.map((element, index) => (
                    <div className='col-12'>
                        <div className='property-wrapper field-item'>{element.content}</div>
                    </div>
                ))}
                {statisticalData.creation_date != ''?
                    (<div className='col-12 d-flex align-items-center field-common-readonly'>
                        Ngày tạo:
                        <span className='ms-2 me-2'>{statisticalData.creation_date}</span>
                    </div>) : ('')
                }
                {statisticalData.author != ''?
                    (<div className='col-12 field-common-readonly'>
                        Người tạo:
                        <span className='ms-2 me-2'>{statisticalData.author}</span>
                    </div>) : ('')
                }
            </div>
        )
    }

    const handleChange = (e) => {
        setData(e.formData);
    }

    return (
        <Form
            key={`${JSON.stringify(schema)}`}
            schema={schema}
            validator={validator}
            customValidate={customValidate}
            templates={{ObjectFieldTemplate}}
            uiSchema={schema.ui_section}
            formData={data}
            transformErrors={transformErrors}
            fields={{
                textField: TextField,
                switchField: SwitchField,
                selectSingleField: SelectSingleField,
                imageField: ImageField,
                linkForm: LinkForm,
                datePicker: DatePicker
            }}
            onChange={handleChange}
        />

        // <div className='row'>
        //     <div className='accordion-header mb-5'>
        //         <h2>
        //             Thông tin chung
        //         </h2>
        //     </div>
        //     <div className='col-12'>
        //         <div className="form-group primaryForm has-feedback fv-plugins-icon-container">
        //             <label>Trạng thái</label>
        //             <Select options={dataStatus} styles={customStyles}
        //                     value={selectStatus} onChange={handleChange}
        //             />
        //         </div>
        //     </div>
        //     <div className='col-12'>
        //         <div className="form-group primaryForm has-feedback fv-plugins-icon-container has-success">
        //             <label>Ngày đăng</label>
        //             <DatePicker selected={startDate} showIcon
        //                         onChange={handleChange} onFocus={handleFocus}
        //                         dateFormat="yyyy-MM-dd"
        //             />
        //         </div>
        //     </div>
        //     {statisticalData.creation_date != '' ?
        //         (<div className='col-12 d-flex align-items-center field-common-readonly'>
        //             Ngày tạo:
        //             <span className='ms-2 me-2'>{statisticalData.creation_date}</span>
        //             <FontAwesomeIcon
        //                 icon={faCalendar}
        //             />
        //         </div>) : ('')
        //     }
        //     {statisticalData.author != '' ?
        //         (<div className='col-12 field-common-readonly'>
        //             Người tạo:
        //             <span className='ms-2 me-2'>{statisticalData.author}</span>
        //         </div>) : ('')
        //     }
        // </div>
    )
}
