import { ADD_NOTE, CHANGE_COLOR, REMOVE_NOTE } from '../actions/NoteAction';

const initialState = {
    notes:{}
}

function NotesReducer(state = initialState, action) {
    switch(action.type) {
    case ADD_NOTE:
      return {
          ...state,
          notes:action.payload
        }

    default:
      return state;
  };
}

export default NotesReducer;