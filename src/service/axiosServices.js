import axios from "axios";

export default function axiosService(){
}

axiosService.prototype.get = function get(URL,isHeaderReq = false ,header) {
    return axios.get(URL, isHeaderReq && header);
}

axiosService.prototype.post = function post(URL, data, isHeaderReq = false ,header) {
    console.log("HD=="+header);
    return axios.post(URL, data, isHeaderReq && header)
}

axiosService.prototype.put = function update(URL, data, isHeaderReq = false ,header) {
    return axios.put(URL, data, isHeaderReq && header)
}

axiosService.prototype.delete = function delte(URL, isHeaderReq = false ,header) {
    return axios.delete(URL, isHeaderReq && header)
}