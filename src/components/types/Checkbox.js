import { useState, useEffect } from 'react';

export default function Checkbox(props){
    const { onChange, formData, idSchema, schema, required } = props
    const [check, setCheck] = useState(false);

    const handleChange = (e) => {
        onChange(e.target.checked);
        setCheck(e.target.checked);
    }

    useEffect(() => {
        if(formData){
            setCheck(formData);
        }
    }, []);

    return (
        <div className="form-check-selection d-flex align-items-center pt-1 pb-1">
            <input id = {idSchema.$id}
                   className = "check-input-section"
                   type = "checkbox"
                   checked = {check}
                   onChange = {handleChange}
            />
            <label htmlFor={idSchema.$id} className="form-label ms-3">
                {schema.label}
                {required ? <span style={{color: 'red'}}> *</span> : null}
            </label>
        </div>
    )
}