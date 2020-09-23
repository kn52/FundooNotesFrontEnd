export const ADD_NOTE = 'ADD_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const UPDATE_COLOR = 'UPDATE_COLOR';

export function addNote(note) {
  return { 
      type: ADD_NOTE, 
      payload: note
    };
}

export function editNotes(note){
  return { 
    type: EDIT_NOTE, 
    id:note.noteId,
    obj:note,
  };
}

export function updateColor(noteid,color) {
  return { 
    type: UPDATE_COLOR, 
    id:noteid,
    color:color,
  };
}