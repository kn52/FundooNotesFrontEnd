import { combineReducers } from "redux";
import DrawerReducer from './DrawerReducer';
import LabelReducer from './LabelReducer';
import NoteReducer from './NoteReducer';
import ApiReducer from './ApiReducer';

const RootReducer = combineReducers({
    drawer: DrawerReducer,
    label: LabelReducer,
    note:NoteReducer,
    api:ApiReducer
})

export default RootReducer;