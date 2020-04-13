import axios from "axios";

const BaseUrl = '';

const ajax = (url, data={}, type="GET")=>{
    url = BaseUrl + url;
    if(type === 'GET'){
        return axios.get(url, {
            params: data
        })
    }else {
        return axios.post(url, data);
    }
};

export default ajax;