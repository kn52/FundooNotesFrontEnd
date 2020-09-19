import { ADD_NOTE, CHANGE_COLOR, REMOVE_NOTE } from '../actions/NoteAction';

const initialState = {
      notes:[]
}

function NotesReducer(state = initialState, action) {
    switch(action.type) {
    case ADD_NOTE:
      return {notes: [
        ...state.notes,
        {
          notes:action.payload
        }
      ]};

    case REMOVE_NOTE:
      return {notes: state.notes.filter((note, index) => index !== action.id)};

    case CHANGE_COLOR:
        return {
            notes:[
              // ...state.notes,
              // {
              //   notes[action.key-1]:action.
              // }
            ]
            // ...state.notes[action.id-1]
        }

    default:
      return state;
  };
}

export default NotesReducer;