import NoteService from '../service/NoteService';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/actions/NoteAction'

export function addNotes(data) {
    let response = NoteService.addNote(data).then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })

    return response;
}

export function getAllNotes(data) {
    let response={};
    NoteService.getNotes(data).then((res) => {
        console.log(res);
        response=res.data.data.data.reverse();
        return response;
    })
    .catch((err) => {
        console.log(err);

    })
    console.log(response);
}