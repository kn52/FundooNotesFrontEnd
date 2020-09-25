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

    updateNote(data) {
        const headers = this.getHeader();
        let url=BASEURL.fundooUrl + '/notes/updateNotes';
        return this.axiosservice.post(url,data,true,headers);
    }

    pinUnpinNotes(data) {
        const headers = this.getHeader();
        let url=BASEURL.fundooUrl + '/notes/pinUnpinNotes';
        return this.axiosservice.post(url,data,true,headers);
    }

    changesColorNotes(data) {
        const headers = this.getHeader();
        let url=BASEURL.fundooUrl + '/notes/changesColorNotes';
        return this.axiosservice.post(url,data,true,headers);
    }

    trashNotes(data){
        const headers = this.getHeader();
        let url=BASEURL.fundooUrl + '/notes/trashNotes';
        return this.axiosservice.post(url,data,true,headers);
    }

    getTrashNotes(data) {
        const headers = this.getHeader();
        let url=BASEURL.fundooUrl + '/notes/getTrashNotesList';
        return this.axiosservice.get(url,true,headers);
    }

    deleteForeverNotes(data) {
        const headers = this.getHeader();
        let url=BASEURL.fundooUrl + '/notes/deleteForeverNotes';
        return this.axiosservice.post(url,data,true,headers); 
    }

    archiveNotes(data) {
        const headers = this.getHeader();
        let url=BASEURL.fundooUrl + '/notes/archiveNotes';
        return this.axiosservice.post(url,data,true,headers); 
    }

    getArchiveNotes() {
        const headers = this.getHeader();
        let url=BASEURL.fundooUrl + '/notes/getArchiveNotesList';
        return this.axiosservice.get(url,true,headers);
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