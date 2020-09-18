import axiosservice from './axiosServices'; 
import BASEURL from '../config/urlConstant';

class NoteService {
    constructor() {
        this.axiosservice = new axiosservice();
    }

    getNotes() {
        const headers = this.getHeader();
        let url=BASEURL.fundooUrl + '/notes/getNotesList'; 
        return this.axiosservice.get(url,true,headers);
    }

    addNote(data) {
        const headers = this.getHeader();
        let url=BASEURL.fundooUrl + '/notes/addNotes';
        return this.axiosservice.post(url,data,true,headers);
    }

    getHeader = () => {
        return {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("userToken")
          }
        }
    }
}

export default new NoteService();