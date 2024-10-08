import React from "react";
import Select from 'react-select';

export default function CategorySelect ({ categories, setCategory, category })  {
    const selectChange = (e) => {
        setCategory(e.target.value);
    }
    return (
        <div className="col-12 col-xl-6">
            <div className="form-group primaryForm">
                <label>Chọn loại media</label>
                <select name="category"
                        id="category-selection"
                        className="form-control select-modal"
                        data-width="100%"
                        onChange={selectChange}
                        value = {category}
                        onClick={(e) => e.stopPropagation()}>
                    <option value="-1">Chưa phân loại</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <i className="simple-icon-arrow-down select-icon"></i>
            </div>
        </div>
    );
};