import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Sử dụng axios cho các cuộc gọi API
import { Tabs, Tab, Modal } from 'react-bootstrap';

import { useLoading } from '../../hooks/LoadingContext';
import UploadImages from './UploadImages';
import ListImages from './ListImages';
import { getListImagesAPI } from '../../api/ImageApi';
import { getMediaCategory } from '../../api/MediaApi';

export default function ModalUpload (options){
    const {isOpen, setIsOpen, imageShow, setImageShow, onChange, maxUpload} = options;
    const { startLoading, stopLoading } = useLoading();
    const [listCategories, setListCategories] = useState([]);
    const [activeKey, setActiveKey] = useState('upload');
    const [browseImages, setBrowseImages] = useState({});
    const configImage = {
        inputName: '', file: {},
    }
    const [imageChoose, setImageChoose] = useState(configImage)


    const handleChooseFile = (e) => {
        setImageShow(imageChoose.file);
        onChange([imageChoose.file.id, imageChoose.file.file_src]);
        setImageChoose(configImage);
        closeModal();
    };

    const getCategory = async () =>{
        startLoading();
        let res = await getMediaCategory();
        if (res.code == 200) {
            setListCategories(res.message);
        }
        setTimeout(stopLoading(), 3000);
    }

    const listMedia = async () => {
        const data = new FormData();
        data.append('page', 1);
        data.append('multiple_select', false);
        let res = await getListImagesAPI(data);
        if (res.code == 200) {
            setBrowseImages(res.message);
        }
    }

    const handleTransferTab = (k) => {
        startLoading();
        if(k == 'browse'){
            listMedia()
        }
        setActiveKey(k);
        setTimeout(stopLoading(), 3000);
    }

    useEffect(() => {
        getCategory();
    }, []);

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Modal show={isOpen} onHide = {closeModal} className="UploadImage">
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3 className="modal-title">upload image</h3>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="row section-form-tab">
                    <div className="col-12 form-rjsf mb-3">
                        <Tabs
                            className="mb-3"
                            id="controlled-tab-modalUploadImage"
                            activeKey={activeKey} // Điều khiển tab hiện tại
                            onSelect={(k) => handleTransferTab(k)} // Cập nhật tab khi người dùng nhấn vào
                        >
                            <Tab eventKey="upload" title="Upload">
                                <UploadImages listCategories={listCategories}
                                              maxUpload = {maxUpload}
                                              setActiveKey = {setActiveKey}
                                              listMedia = {listMedia}/>
                            </Tab>
                            <Tab eventKey="browse" title="Browse">
                                <ListImages listCategories={listCategories}
                                            imageChoose={imageChoose}
                                            setImageChoose={setImageChoose}
                                            content={browseImages}
                                            setContent={setBrowseImages}
                                />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button id="btn-choose-version" className="btn btnPrimary" type="button"
                        onClick={handleChooseFile}>upload
                </button>
            </Modal.Footer>
        </Modal>
    )
}

const customStyles = {
    content: {
        padding: 0,
        maxHeight: '80%',
        zIndex: '4',
        width: '45%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};