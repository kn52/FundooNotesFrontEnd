export const ADD_NOTE = 'ADD_NOTE';
export const ADD_NEW_NOTE = 'ADD_NEW_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const UPDATE_COLOR = 'UPDATE_COLOR';
export const TRASH_AND_RESTORE_NOTE = 'TRASH_AND_RESTORE_NOTE';
export const DELETE_FOREVER_NOTE = 'DELETE_FOREVER_NOTE';
export const PIN_UNPIN_NOTE = 'PIN_UNPIN_NOTE';
export const SEARCH_NOTE = 'SEARCH_NOTE';
export const ARCHIVE_UNARCHIVE_NOTE = 'ARCHIVE_UNARCHIVE_NOTE';

export function addNote(note) {
  return { 
      type: ADD_NOTE, 
      payload: note
    };
}

export function addNewNote(note) {
  return { 
      type: ADD_NEW_NOTE, 
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

export function trashNotes(id,bool){
  return { 
    type: TRASH_AND_RESTORE_NOTE, 
    id:id,
    bool:bool
  };
}

export function updateColor(noteid,color) {
  return { 
    type: UPDATE_COLOR, 
    id:noteid,
    color:color,
  };
}

export function deleteForeverNotes(noteid) {
  return { 
    type: DELETE_FOREVER_NOTE, 
    id:noteid,
  };
}

export function pinUnpinNotes(noteid,bool) {
  return { 
    type: PIN_UNPIN_NOTE, 
    id:noteid,
    bool:bool,
  };
}

export function searchNotes(text) {
  return { 
    type: SEARCH_NOTE, 
    txt:text,
  };
}

export function archiveNotes(noteid,bool) {
  return { 
    type: ARCHIVE_UNARCHIVE_NOTE, 
    id:noteid,
    bool:bool,
  };
}
