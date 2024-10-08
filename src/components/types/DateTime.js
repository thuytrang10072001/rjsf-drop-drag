import { useState, useEffect, useCallback, useRef } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays} from '@fortawesome/free-solid-svg-icons';

const CustomDatePickerInput = ({ value, onClick, onFocus }) => (
    <div class="react-datepicker-wrapper">
        <div class="react-datepicker__input-container">
            <input type="text" class="react-datepicker-ignore-onclickoutside" value={value} onClick={onClick} onFocus={onFocus}/>
            <FontAwesomeIcon icon={faCalendarDays} onClick = {onClick} style={{position: 'absolute', right: '0.5rem', color: '#8E8E93'}}/>
        </div>
    </div>

);

export default function DateTime (props) {
    const { onChange, formData, schema } = props;
    const [startDate, setStartDate] = useState(null);

    const handleChange = (date) => {
        const format = formatDate(date);
        onChange(format);
        setStartDate(format);
    }

    const formatDate = (date) => {
        return format(date, 'yyyy-MM-dd');
    }

    const handleFocus = () => {
        if(!startDate){
            let format = formatDate(new Date());
            setStartDate(format);
            onChange(format);
        }
    }

    useEffect(() => {
        if(formData){
            setStartDate(formData)
        }
    }, []);

    return (
        <div className="form-group primaryForm has-feedback fv-plugins-icon-container has-success">
            <label>{schema.label}</label>
            <DatePicker selected={startDate}
                        customInput={<CustomDatePickerInput />}
                        onChange={handleChange} onFocus = {handleFocus}
                        dateFormat="yyyy-MM-dd"
            />
        </div>
    )
}