import { TOGGLE_DRAWER_OPEN, TOGGLE_DRAWER_CLOSE } from "../actions/DrawerAction";

const initialState = {
    openDrawer: false
}

const DrawerReducer = (state = initialState, action) => {
    
    switch(action.type) {
       
        case TOGGLE_DRAWER_OPEN:
            return {
                ...state,
                openDrawer: true
            }

        case TOGGLE_DRAWER_CLOSE:
            return {
                ...state,
                openDrawer: false
            }

        default: return state
    }
};

export default DrawerReducer;