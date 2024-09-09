import { useState, useEffect, useCallback } from 'react';

export default function Modal(props){
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm Section</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='' onSubmit={props.handleSubmit}>
                            {props.sections.map((item, index) => (
                                <div className="form-check-selection">
                                    <input className="check-input-section"
                                           type="checkbox"
                                           value={index}
                                           id={item.section_key}
                                           onChange={props.handleCheckboxChange}
                                           checked = {props.checkSection[item.section_key]? true : false}
                                    />
                                    <label className="" htmlFor={item.section_key}>
                                        {item.title}
                                    </label>
                                </div>
                            ))}
                            <div className="modal-footer">
                                <button type="button" className="btn btnPrimary" data-bs-dismiss="modal">Hủy
                                </button>
                                <button type='submit' className='btn btnPrimary' data-bs-dismiss="modal">Thêm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}