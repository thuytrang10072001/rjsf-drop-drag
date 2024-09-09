export default function UploadImage ({props}){
    return (
        <div className='row'>
            <div className="col-12">
                <div className="element-block">
                    <div id="languagesvimeta-image_upload" className="upload-image-block">
                        <div className="row">
                            <div className="col-8">
                                <a data-input-name="languagesvimeta-image" data-instant-single="1"
                                   data-file-type="image/png, image/jpeg, image/jpeg, image/bmp, image/gif, image/webp, image/svg+xml"
                                   data-max-upload="2" className="import-img btn-open-modal-upload"
                                   href="javascript:void(0);" data-bs-target="#ModalUploadImage" data-bs-toggle="modal">
                                    <img className="img-thumbnail" src="/vendor/mpire-cms3/assets/img/img-import.svg"
                                         alt=""/>
                                </a>
                            </div>
                            <div className='col-4 note-image'>
                                Dung lượng tối đa 2MB<br/>
                                Hỗ trợ các định dạng hình ảnh<br/>
                                Kích thước đề nghị 1920x1080 pixels
                            </div>
                            <div className="col-8 image-info">
                                <h6>{props.schema.label}</h6>
                                <p className="url-thumbnail"></p>
                                <a data-input-name="languagesvimeta-image" data-instant-single="1"
                                   data-file-type="image/png, image/jpeg, image/jpeg, image/bmp, image/gif, image/webp, image/svg+xml"
                                   data-max-upload="2" href="javascript:void(0);"
                                   className="btn btn-open-modal-upload btn-img-upload ResetLinkPrimary btnUploadImage me-2"
                                   data-bs-target="#ModalUploadImage" data-bs-toggle="modal">Tải lên</a>
                                <a data-input-name="languagesvimeta-image"
                                   className="btn btnUploadImage btn-img-delete d-none">Xóa ảnh</a>
                            </div>
                        </div>
                    </div>
                    <div className="form-group primaryForm has-feedback fv-plugins-icon-container">
                        <input name="languages[vi][meta_image]" data-instant-single="1" data-fv-field="meta_image"
                               id="languagesvimeta-image" data-input-name="languagesvimeta-image"
                               className="input-image d-none" type="text"/>
                        <div className="fv-plugins-message-container"></div>
                    </div>
                </div>
            </div>

        </div>

    )
}