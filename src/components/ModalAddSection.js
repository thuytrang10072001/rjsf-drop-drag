import { useState, useEffect, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function ModalAddSection(props){

    const {sections, checkSection, totalSec, handleSubmit, show, closeModal, handleCheckboxChange, setSelectedValues, setCheckSections} = props

    const [searchTerm, setSearchTerm] = useState('');
    const [filSecs, setFilSecs] = useState([]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filter = sections.filter(section =>
            section.title.toLowerCase().includes(value)
        );
        setFilSecs(filter);
    };

    useEffect(() => {
       setFilSecs(sections);
    }, [sections])

    return (
        <Modal show={show} onHide = {closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3 class="modal-title">Thêm section</h3>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className='row'>
                    <div className="dt-search col-12 pb-4">
                        <input type="search" className="form-control form-control-sm"
                               id="dt-search-section" placeholder="Tìm kiếm"
                               aria-controls="table-page-list"
                               value={searchTerm}
                               onChange={handleSearch}
                        />
                    </div>
                    <div style={{height: '200px'}}>
                        {filSecs.map((item, index) => (
                            <div className="form-check-selection d-flex align-items-center pt-1 pb-1">
                                <input className="check-input-section"
                                       type="checkbox"
                                       value={item.section_key}
                                       id={item.section_key}
                                       onChange={(e) => handleCheckboxChange(e, setSelectedValues, setCheckSections)}
                                       checked={checkSection[item.section_key] ? true : false}
                                       disabled={totalSec[item.section_key] >= 10 ? true : false}
                                />
                                <label className="" htmlFor={item.section_key}>
                                    {item.title}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btnPrimary" onClick={closeModal}>Đóng</button>
                <button type='submit' className='btn btnPrimary' onClick={handleSubmit}>Thêm</button>
            </Modal.Footer>
        </Modal>
    )
}

ModalAddSection.defaultProps = {
    sections: [],
    checkSection: {},
    totalSec: {}
}