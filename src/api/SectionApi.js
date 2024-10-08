import {httpGet, httpPost} from '../services/http'

const endpoints = {
    getListSections: '/cms/admin-page-v2/sections',
    test: '/page-v2/api/get-sections'
}

export const listSection = async() => {
    return await httpGet(endpoints.getListSections, {'Content-Type': 'application/json'}, true);
}