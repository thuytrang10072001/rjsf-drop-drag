import React, {useEffect, useState} from "react";

import { useLoading } from '../../hooks/LoadingContext';
import {getListImagesAPI} from '../../api/ImageApi';

export default function ListImages(props){
    const { listCategories, imageChoose, setImageChoose, content, setContent } = props;
    const { startLoading, stopLoading } = useLoading();
    const [category, setCategory] = useState(null);
    const [key, setKey] = useState('');
    const [page, setPage] = useState(1);

    const listImageMedia = async (cate, key_word, paging) => {
        startLoading();
        const data = new FormData();
        data.append('page', paging);
        data.append('multiple_select', false);
        if(cate){
            data.append('media_type', cate);
        }
        if(key_word){
            data.append('key',key_word);
        }
        let res = await getListImagesAPI(data);
        if (res.code == 200) {
            setContent(res.message);
        }
        setTimeout(stopLoading(), 3000);
    }

    const handleSelectChange = (e) => {
        setCategory(e.target.value);
        listImageMedia(e.target.value, key, page);
    }

    const handleKeyChange = (e) => {
        setKey(e.target.value);
        listImageMedia(category, e.target.value, page);
    }

    const handlePaging = (e) => {
        e.preventDefault();
        const paging = parseInt(e.target.dataset.pagenumber);
        setPage(paging);
        listImageMedia(category, key, paging);
    }

    const handleStopPropagation = (e) => {
        e.preventDefault();
        const parent = e.target.parentElement;
        parent.click();
    }

    const handleSelectVersion = (e) => {
        const id = e.target.dataset.id;
        const chooseVersion = e.target.closest('.choose-version')
        chooseVersion.previousElementSibling.value = id;
        chooseVersion.querySelector(".span-active").innerText = e.target.innerText;
    }

    useEffect(() => {
        console.log('hello')
        const elements = document.querySelectorAll(".input-version-image");
        elements.forEach((element) => {
            element.addEventListener('click', handleClick);
        });

        const versions = document.querySelectorAll(".dropdown-item.version-item");
        versions.forEach((element) => {
            element.addEventListener('click', handleSelectVersion);
        });

        const pages = document.querySelectorAll(".page-link");
        pages.forEach((element) => {
            element.addEventListener('click', handlePaging)
        })

        const collection = document.getElementsByTagName("em");
        Array.from(collection).forEach((element) => {
                element.addEventListener('click', handleStopPropagation)
        })


        const select = document.getElementById("cate-selection-browse");
        if(select) {
            select.addEventListener('change', handleSelectChange)
        }

        const key_word = document.getElementById("search-keyword");
        if(key_word){
            key_word.addEventListener('input', handleKeyChange)
        }
    }, [content])

    const handleClick = (e) => {
        const parent = e.target.parentElement;
        let fileName = ''
        if (parent) {
            const siblings = Array.from(parent.children);
            fileName = siblings.filter((child) => child.className == 'file-name')[0].textContent;
        }
        setImageChoose((prev) => {
            return ({
                ...prev,
                file: {
                    file_src: e.target.dataset.imgSrc,
                    fileName: fileName,
                    extension: e.target.dataset.extension,
                    id: e.target.value
                }
            })
        })
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: content.html}}></div>
            <nav id="pagination-modal-image" dangerouslySetInnerHTML={{__html: content.pagination}}></nav>
        </div>
    )
}