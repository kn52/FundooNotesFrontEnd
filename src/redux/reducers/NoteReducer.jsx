import { ADD_NOTE, UPDATE_COLOR, EDIT_NOTE } from '../actions/NoteAction';

const initialState = {
    notes:{}
}

function NotesReducer(state = initialState, action) {
  console.log("Note Reducer");  
  switch(action.type) {
    case ADD_NOTE:
      return {
          ...state,
          notes:action.payload
        }
    
    case EDIT_NOTE:
      return {
        ...state,    
                notes: state.notes.map(    
                    (note, index) => note.id === action.id ? {
                      ...note, title : action.obj.title ,  
                              description : action.obj.description } : note)
      }

    // case REMOVE_NOTE:
    //   return {notes: state.notes.filter((note, index) => index !== action.id)};

    case UPDATE_COLOR:
        console.log("Color Change");
        return {
          ...state,
          notes: state.notes.map((note,index)=> note.id === action.id ? 
              {...note, color: action.color} : note), 
        }

    default:
      return state;
  };
}

export default NotesReducer;