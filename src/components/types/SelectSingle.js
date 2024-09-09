import { useState, useEffect, useCallback, useRef } from 'react';
import $ from 'jquery';
import 'select2';


export default function SelectSingle ({props}){
    useEffect(() => {
        $('.select2-single-no-search').select2({
            theme: "bootstrap",
            placeholder: "",
            maximumSelectionSize: 6,
            containerCssClass: ":all:",
            minimumResultsForSearch: Infinity
        });

        return () => {
            $('.select2-single-no-search').select2('destroy');
        };
    }, []);

    return (
        <div className="form-group primaryForm has-feedback fv-plugins-icon-container">
            <label>{props.schema.label}</label>
            <select
                data-fv-field="status"
                className="form-control select2-single-no-search form-control select2-hidden-accessible"
                single="select2-single-no-search" name="status" data-width="100%" tabIndex="-1" aria-hidden="true"
                id="status">
                <option locked="locked" value="1">Kích hoạt</option>
                <option locked="locked" value="2">Chờ xử lý</option>
            </select>
        </div>
    );
}