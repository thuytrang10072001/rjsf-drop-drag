import React, { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';

import { useLoading } from '../../hooks/LoadingContext';
import CategorySelect from './CategorySelect';
import { uploadMedia } from '../../api/MediaApi';

const Dropzone = ({list, setList, item, index}) => {

    const removeImage = (e) => {
        e.stopPropagation()
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
    }

    return (
        <div class="dz-preview dz-file-preview mb-3">

            {item.error ? (
                <div className="dz-progress">
                    <span className="dz-upload" data-dz-uploadprogress></span>
                </div>) : ('')}
            <div class="d-flex flex-row ">
                <div class="p-0 w-30 position-relative">
                    {item.error ? (
                        <div className="dz-error-mark">
                            <span><i className="simple-icon-exclamation"></i></span>
                        </div>) : (
                        <div className="dz-success-mark">
                            <span><i className="fas fa-check-circle"></i></span>
                        </div>
                    )}
                    <img data-dz-thumbnail class="img-thumbnail border-0" src={item.path}/>
                </div>
                <div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
                    <div><span data-dz-name>{item.name}</span></div>
                    <div class="text-primary text-extra-small" data-dz-size>
                        <strong>{item.size}</strong>
                    </div>
                </div>
                {item.error ? (
                    <div className="dz-error-message">
                        <span data-dz-errormessage>{item.error}</span>
                    </div>) : ('')}
            </div>
            <a href="#" class="remove" onClick={removeImage}> <i class="simple-icon-trash"></i> </a>
        </div>)
}

export default function UploadImages(props) {
    const { listCategories, maxUpload, setActiveKey, listMedia } = props;
    const { startLoading, stopLoading } = useLoading();
    const [listImage, setListImage] = useState([]);
    const [category, setCategory] = useState(-1);

    const uploadImage = async (data) => {
        const result = await uploadMedia(data);
        return result;
    }

    const sizeFile = (size) => {
        if (size < 1024 * 1024) {
            const sizeInKB = (size / 1024).toFixed(2);
            return `${sizeInKB} KB`;
        } else {
            const sizeInMB = (size / (1024 * 1024)).toFixed(2);
            return `${sizeInMB} MB`;
        }
    }

    const onDrop = useCallback(async acceptedFiles => {
        startLoading();
        const data = new FormData();
        for (const image of acceptedFiles) {
            data.append('file', image);
            data.append('category', category);
            const size = sizeFile(image.size)
            if(image.size > 1024*1024){
                setListImage((prev) => {
                    return [...prev, {
                        name: image.name,
                        size: size,
                        path: image.path,
                        error: `"Tệp quá lớn (${size}). Dung lượng tối đa có thể upload: ${maxUpload}MiB."`
                    }]
                })
            }else{
                const result = await uploadImage(data);
                const fileDetail = result.files[0]
                if(fileDetail.id){
                    setListImage((prev) => {
                        return [...prev, {
                            name: fileDetail.name,
                            size: size,
                            path: fileDetail.url + '.' + fileDetail.extension,
                            error: ''
                        }]
                    })
                    setActiveKey('browse');
                    listMedia();
                }
            }
        };
        setTimeout(stopLoading(), 3000);
    }, [category]);

    const {getRootProps, getInputProps} = useDropzone({onDrop,
        accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        },
        multiple: false,
    });

    return (
        <div className="tab-pane fade show active" id="upload-content" role="tabpanel" aria-labelledby="upload-tab">
            <div className="row">
                <div className="col-12 dropzone-files">
                    <form encType="multipart/form-data" method="POST" className="dropzone dz-clickable"
                          action="/cms/media/upload"
                          {...getRootProps({className: 'dropzone'})}
                    >
                        <div className="row file-category">
                            <CategorySelect categories={listCategories}
                                            setCategory = {setCategory}
                                            category = {category}/>
                        </div>
                        <img  className="ic-upload" src="/vendor/mpire-cms3/assets/img/ic-upload.svg" alt=""/>
                        <input {...getInputProps()}/>
                        <div className="dz-message" data-dz-message></div>
                        {listImage.map((item, index) => (
                            <Dropzone item  = {item}
                                      list = {listImage}
                                      setList = {setListImage}
                                      index = {index}/>
                        ))}
                    </form>
                </div>
            </div>
        </div>)
}