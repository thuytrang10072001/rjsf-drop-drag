import {httpGet, httpPost} from '../services/http'

const endpoints = {
    getCategories: '/cms/media-category/api/list',
    uploadMedia: '/cms/media/upload'
}

export const getMediaCategory = async(data) => {
    return await httpGet(endpoints.getCategories, data, {'Content-Type': 'application/json'}, true);
}

export const uploadMedia =  async(data) => {
    return await httpPost(endpoints.uploadMedia, data, {'Content-Type': 'multipart/form-data'}, true);
}