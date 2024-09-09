import { axios } from "./AxiosConfig";

const GET_SECTIONS  = "/cms/admin-page-v2/sections";
const TEST = "/page-v2/api/sections";

const CREATE_PAGE_TEST = "/page-v2/api/create-page"
const CREATE_PAGE_API = "/cms/admin-page-v2/create-page"


//Get list section
export async function listSection() {
    return await axios.get(GET_SECTIONS);
}

export async function createPage(data){
    return await axios.post(CREATE_PAGE_API, data);
}

