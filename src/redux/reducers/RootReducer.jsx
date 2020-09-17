import { combineReducers } from "redux";
import DrawerReducer from './DrawerReducer';
import LabelReducer from './LabelReducer';
import NoteReducer from './NoteReducer';

const RootReducer = combineReducers({
    drawer: DrawerReducer,
    label: LabelReducer,
    note:NoteReducer
})

export default RootReducer;