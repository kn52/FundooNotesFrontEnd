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
		let headers={};
		return this.axiosservice.post(url+`?access_token=${token}`,data,true,headers);
	}

	getNotes() {
		let url=BASEURL.fundooUrl + '/user/' + localStorage.getItem("userid") + '/notes';
		let header=new Headers();
		//header=header.append("type","application/json");
		header=header.append("autherization",localStorage.getItem("userToken"));
		// let header={"access_token":localStorage.getItem("userToken")}
		// let header={}
		// header.access_token=localStorage.getItem("userToken");
		return this.axiosservice.get(url,true, header);
	}

	addNote(data) {
		const dt = {
			title: "noteTitle",
			description: "noteContent",
			// PinStatus: false,
			// Archive: false,
			// Trash: false,
			// Color: '#ffffff',
			// ReminderDate: null,
			// ReminderTime: null
		}
		const headers = {headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem("userToken")
		  }}

		let url=BASEURL.fundooUrl + '/notes/addNotes';
		return this.axiosservice.post(url,dt,true,headers);
	}

	deleteNote(notekey) {
		let url=BASEURL.fundooUrl + '/user/' + notekey + '/notes';
		return this.axiosservice.delete(url,false);
	}
}

export default new UserService();
