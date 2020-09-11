import axiosservice from './axios_services'; 
import BASEURL from '../config/urlConstant'

class UserService {

    constructor(){
        this.axiosservice = new axiosservice();
    }
	
	register(data) {
		let url=BASEURL.fundooUrl + '/user/userSignUp';
		return this.axiosservice.post(url,data,false);
	}
	
	login(data){
		let url=BASEURL.fundooUrl + '/user/login';
		return this.axiosservice.post(url,data,false);
	}
}

export default new UserService();
