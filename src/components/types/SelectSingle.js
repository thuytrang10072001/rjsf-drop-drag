import { useEffect, useState } from 'react';
import Select from 'react-select';


export default function SelectSingle (props){
    const { onChange, schema, formData, required } = props
    const [selectedOption, setSelectedOption] = useState(schema.data[1]);

    const handleChange = (e) => {
        setSelectedOption(e);
        onChange(e.value);
    }

    useEffect(() => {
        setSelectedOption(schema.data.filter(val => val.value == formData));
    }, [formData]);

    return (
        <div className="form-group primaryForm has-feedback fv-plugins-icon-container">
            <label>{schema.label} {required ? <span style={{ color: 'red' }}> *</span> : null}</label>
            <Select options = {schema.data} styles = {customStyles}
                    value = {selectedOption} onChange={handleChange}
                    placeholder = {schema.placeholder}
            />
        </div>
    );
}

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: '0.1rem',
        backgroundColor: 'white',
        zIndex: '0',
        borderColor: state.isFocused ? '#28B6B6' : '#d7d7d7',
        boxShadow: state.isFocused? '#28B6B6 0px 0px 0px 1px' : null,
        '&:hover': {
            borderColor: '#d7d7d7',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#EFEFF4' : state.isFocused ? '#28B6B6' : 'white',
        color: state.isSelected ? 'black' : state.isFocused ? 'white' : 'black',
        '&:hover': {
            backgroundColor: '#28B6B6',
        },
    }),
    menu: (provided) => ({
        ...provided,
        border: '1px solid #28B6B6',
        borderRadius: '4px',
        padding: '12px',
        boxShadow: 'none',
        zIndex: '2'
    }),
};