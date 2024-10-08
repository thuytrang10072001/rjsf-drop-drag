import {httpGet, httpPost} from '../services/http'

const endpoints = {
    createPage: '/cms/admin-page-v2/create-page',
    listPageTranslation: '/cms/admin-page-v2/url-module',
    listTest: 'http://localhost:85/page-v2/api/url-module'
}

export const createPage = async(data) => {
    return await httpPost(endpoints.createPage, data, {'Content-Type': 'application/json'}, true);
}

export const getListPageTranslation = async(data) => {
    return await httpGet(endpoints.listPageTranslation, data, {'Content-Type': 'application/json'}, true)
}