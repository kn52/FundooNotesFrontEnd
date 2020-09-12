import axiosservice from './axiosServices'; 
import BASEURL from '../config/urlConstant';

class UserService {

    constructor() {
        this.axiosservice = new axiosservice();
    }
	
	register(data) {
		let url=BASEURL.fundooUrl + '/user/userSignUp';
		return this.axiosservice.post(url,data,false);
	}
	
	login(data) {
		let url=BASEURL.fundooUrl + '/user/login';
		return this.axiosservice.post(url,data,false);
	}

	forget(data) {
		let url=BASEURL.fundooUrl + '/user/reset';
		this.axiosservice.post(url,data,false);
	}

	resetPassword(data,token) {
		let url=BASEURL.fundooUrl + '/user/reset-password';
		this.axiosservice.post(url,data,true,token);
	}
}

export default new UserService();
