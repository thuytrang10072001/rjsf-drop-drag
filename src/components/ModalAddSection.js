import { useState, useEffect, useCallback } from 'react';

export default function ModalAddSection(props){

    const [searchTerm, setSearchTerm] = useState('');
    const [filSecs, setFilSecs] = useState([]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filter = props.sections.filter(section =>
            section.title.toLowerCase().includes(value)
        );
        setFilSecs(filter);
    };

    useEffect(() => {
       setFilSecs(props.sections);
    }, [props.sections])

    return (
        <div className="modal fade" id="modalAddSection" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm Section</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='row'>
                            <div className="dt-search col-12 pb-4">
                                <input type="search" className="form-control form-control-sm"
                                       id="dt-search-section" placeholder="Tìm kiếm"
                                       aria-controls="table-page-list"
                                       value={searchTerm}
                                       onChange={handleSearch}
                                />
                            </div>
                            <form className='col-12' onSubmit={props.handleSubmit}>
                                {filSecs.map((item, index) => (
                                    <div className="form-check-selection">
                                        <input className="check-input-section"
                                               type="checkbox"
                                               value={index}
                                               id={item.section_key}
                                               onChange={props.handleCheckboxChange}
                                               checked={props.checkSection[item.section_key] ? true : false}
                                        />
                                        <label className="" htmlFor={item.section_key}>
                                            {item.title}
                                        </label>
                                    </div>
                                ))}
                                <div className="modal-footer">
                                    <button type="button" className="btn btnPrimary" data-bs-dismiss="modal">Hủy
                                    </button>
                                    <button type='submit' className='btn btnPrimary' data-bs-dismiss="modal">Thêm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}