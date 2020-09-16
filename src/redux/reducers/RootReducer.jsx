import { combineReducers } from "redux";
import DrawerReducer from './DrawerReducer';
import LabelReducer from './LabelReducer';

const RootReducer = combineReducers({
    drawer: DrawerReducer,
    label: LabelReducer
})

export default RootReducer;