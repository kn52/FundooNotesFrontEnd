import axiosservice from './axiosServices'; 
import BASEURL from '../config/urlConstant';

class UserService {

    constructor() {
        this.axiosservice = new axiosservice();
    }
    
    login(data) {
		let url=BASEURL.fundooUrl + '/user/login';
		return this.axiosservice.post(url,data,false);
	}
}

export default new UserService();
