import { ADD_NOTE, ADD_NEW_NOTE, UPDATE_COLOR, EDIT_NOTE, PIN_UNPIN_NOTE } from '../actions/NoteAction';
import { TRASH_AND_RESTORE_NOTE,DELETE_FOREVER_NOTE, SEARCH_NOTE,ARCHIVE_UNARCHIVE_NOTE } from '../actions/NoteAction';

const initialState = {
    notes:{},
    searchNotes:[],
    search:false
}

function NotesReducer(state = initialState, action) {
  switch(action.type) {
    
    case ADD_NOTE:
      console.log("ADD");
      return {
          ...state,
          notes:action.payload.reverse()
        };

  case ADD_NEW_NOTE:
    return {
      ...state,
      notes: state.notes.concat(action.payload)
    };
        
    case EDIT_NOTE:
      return {
        ...state, 
        notes: state.notes.map((note, index) => note.id === action.id 
              ? { ...note, title : action.obj.title, description : action.obj.description } 
              : note)
      };

    case TRASH_AND_RESTORE_NOTE:
      return {
        ...state, 
        notes: state.notes.map((note, index) => note.id === action.id 
              ? { ...note, isDeleted : action.bool } : note)
      };

    case UPDATE_COLOR:
        return {
          ...state,
          notes: state.notes.map((note,index)=> note.id === action.id ? 
              {...note, color: action.color} : note), 
        };

    case DELETE_FOREVER_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note, index) => note.id !== action.id)
      };

    case PIN_UNPIN_NOTE:
      return {
        ...state, 
        notes: state.notes.map((note, index) => note.id === action.id 
              ? { ...note, isPined : action.bool } : note)
      };

    case SEARCH_NOTE:
      if(action.txt.length>0 && state.notes.length>0){
        return {
          ...state,
          search:true,
          searchNotes: state.notes
              .filter((note, index) => note.title.includes(action.txt) 
                    || note.description.includes(action.txt)) 
        };
      }else {
        return {
          ...state,
          search:false,
          searchNotes:[]
        }
      }

      case ARCHIVE_UNARCHIVE_NOTE:
        return {
          ...state, 
          notes: state.notes.map((note, index) => note.id === action.id 
                ? { ...note, isArchived : action.bool } : note)
        };

    default:
      return state;
  };
}

export default NotesReducer;