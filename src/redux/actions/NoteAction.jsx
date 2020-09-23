export const ADD_NOTE = 'ADD_NOTE';
export function addNote(note) {
    console.log("Add Action");
  return { 
      type: ADD_NOTE, 
      payload: note
    };
}
