import {useState, useEffect} from "react";
import ModalUpload from '../ModalUpload/index';

export default function Image (props) {
    const {onChange, formData, idSchema, schema, maxUpload} = props
    const [isOpen, setIsOpen] = useState(false);
    const config = {
        file_src: "",
        fileName: '',
        extension: '',
        id: ''
    }
    const [imageShow, setImageShow] = useState(config)

    const hanldeDeleteImage = () => {
        setImageShow(config);
        onChange([]);
    }

    useEffect(() => {
        if(formData){
            setImageShow({
                file_src: formData[1],
                id: formData[0]
            })
        }
    }, [formData]);

    return (
        <>
            <div className='row'>
                <div className="col-12">
                    <div className="element-block">
                        <div id={`${idSchema.$id}_upload`} className="upload-image-block">
                            <div className="row">
                                <div className="col-8">
                                    <a data-input-name="languagesvimeta-image" data-instant-single="1"
                                       data-file-type="image/png, image/jpeg, image/jpeg, image/bmp, image/gif, image/webp, image/svg+xml"
                                       data-max-upload="2" className="import-img btn-open-modal-upload"
                                       href="javascript:void(0);" onClick={() => setIsOpen(true)}>
                                        <img className="img-thumbnail"
                                             src={imageShow.file_src? imageShow.file_src : "/vendor/mpire-cms3/assets/img/img-import.svg"}
                                             alt=""/>
                                    </a>
                                </div>
                                <div className='col-4 note-image'>
                                    Dung lượng tối đa {maxUpload}MB<br/>
                                </div>
                                <div className="col-8 image-info">
                                    <h6>{schema.label}</h6>
                                    <p className="url-thumbnail">{imageShow.file_src? imageShow.file_src : ('')}</p>
                                    <a data-input-name="languagesvimeta-image" data-instant-single="1"
                                       data-file-type="image/png, image/jpeg, image/jpeg, image/bmp, image/gif, image/webp, image/svg+xml"
                                       data-max-upload="2" href="javascript:void(0);"
                                       className="btn btn-open-modal-upload btn-img-upload ResetLinkPrimary btnUploadImage me-2"
                                       data-bs-target="#ModalUploadImage" data-bs-toggle="modal"
                                       onClick={() => setIsOpen(true)}>Tải lên</a>
                                    {imageShow.file_src?(
                                            <a data-input-name="languagesvimeta-image"
                                               className="btn btnUploadImage btn-img-delete"
                                               onClick={hanldeDeleteImage}>Xóa ảnh</a>)
                                        :('')}
                                </div>
                            </div>
                        </div>
                        <div className="form-group primaryForm has-feedback fv-plugins-icon-container">
                            <input name={idSchema.$id} data-instant-single="1" data-fv-field="meta_image"
                                   id={idSchema.$id}
                                   data-input-name="languagesvimeta-image"
                                   className="input-image d-none" type="text"/>
                            <div className="fv-plugins-message-container"></div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalUpload isOpen = {isOpen}
                         setIsOpen = {setIsOpen}
                         imageShow = {imageShow}
                         setImageShow = {setImageShow}
                         maxUpload = {maxUpload}
                         {...props}
            />
        </>
    )
}