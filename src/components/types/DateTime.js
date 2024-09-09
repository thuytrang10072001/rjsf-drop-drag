import { useState, useEffect, useCallback, useRef } from 'react';

export default function DateTime ({props}) {
    useEffect(() => {
        $('#public_date').datetimepicker({
            useStrict: true,
            icons: {
                time: "simple-icon-calendar",
                date: "simple-icon-calendar",
                clear: 'simple-icon-trash',
                up: "fa fa-arrow-up",
                down: "fa fa-arrow-down"
            },
            format: 'YYYY-MM-DD',
            buttons: {
                showClear: true,
            }
        });
    }, []);
    return (
        <div className="form-group primaryForm has-feedback fv-plugins-icon-container has-success">
            <label>{props.schema.label}</label>
            <div className="input-wrap" data-target-input="nearest">
                <input data-fv-field="public_date" className="form-control custom-datetimepicker"
                       placeholder="Chọn ngày" data-format="DD/MM/YYYY" data-type="datetime" type="text"
                       id="public_date" name="public_date" autoComplete="off" data-toggle="datetimepicker"
                       data-target="#public_date"/>
                <span className="input-group-text input-group-append input-group-addon"><i
                    className="far fa-calendar-alt"></i></span>
            </div>
            <div className="fv-plugins-message-container"></div>
        </div>
    )
}