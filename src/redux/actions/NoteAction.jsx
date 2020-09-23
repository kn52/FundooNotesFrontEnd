export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_COLOR = 'UPDATE_COLOR';

export function addNote(note) {
  return { 
      type: ADD_NOTE, 
      payload: note
    };
}

export function updateColor(index,color) {
  console.log("Color Action "+ index);
  return { 
    type: UPDATE_COLOR, 
    id:index,
    color:color,
  };
}