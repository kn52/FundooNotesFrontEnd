export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const CHANGE_COLOR = 'REMOVE_NOTE';

export function addNote(note) {
    console.log("Add Action");
  return { 
      type: ADD_NOTE, 
      payload: note
    };
}

export function removeNote(id) {
    return { 
        type: REMOVE_NOTE, 
        id: id 
    };
}

export function changeColor (id,note) {
    return { 
        type: REMOVE_NOTE,
        id:id, 
        payload: note 
    };
}