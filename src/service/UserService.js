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

	forgetPassword(data) {
		let url=BASEURL.fundooUrl + '/user/reset';
		return this.axiosservice.post(url,data,false);
	}

	resetPassword(data,token) {
		let url=BASEURL.fundooUrl + '/user/reset-password';
		console.log("===============================");
		let headers={};
		headers.access_token=token;
		console.log(headers);
		return this.axiosservice.post(url+`?access_token=${token}`,data,true,headers);
	}
}

export default new UserService();
