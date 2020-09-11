import axios from "axios";

export default function axios_service(){
}

axios_service.prototype.get = function getNotes(URL,isHeaderReq = false ,header) {
    return axios.get(URL, isHeaderReq && header);
}

axios_service.prototype.post = function postNotes(URL, data, isHeaderReq = false ,header) {
    return axios.post(URL, data, isHeaderReq && header)
}

axios_service.prototype.put = function updateNotes(URL, data, isHeaderReq = false ,header) {
    return axios.put(URL, data, isHeaderReq && header)
}

axios_service.prototype.delete = function deleteNotes(URL, isHeaderReq = false ,header) {
    return axios.delete(URL, isHeaderReq && header)
}