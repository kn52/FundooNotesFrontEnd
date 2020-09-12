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
		// const header=new Headers();
		// header.append('access_token',{token});
		// console.log(header);
		return this.axiosservice.post(url,data,true,{ headers: {access_token: token} });
	}
}

export default new UserService();
