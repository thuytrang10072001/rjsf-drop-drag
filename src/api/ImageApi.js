import {httpGet, httpPost} from '../services/http'

const endpoints = {
    getImages: '/cms/media/ajax/list/browse',
}

export const getListImagesAPI = async(data) => {
    return await httpPost(endpoints.getImages, data, {'Content-Type': 'multipart/form-data'}, true);
}