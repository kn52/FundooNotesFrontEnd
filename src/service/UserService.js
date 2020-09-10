import axiosservice from './axiosServices'; 

class UserService {

    constructor() {
        this.axiosservice = new axiosservice();
    }
	
}

export default new UserService();
