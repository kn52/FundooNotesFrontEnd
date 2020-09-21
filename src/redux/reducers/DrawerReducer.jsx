import { TOGGLE_DRAWER_OPEN, TOGGLE_DRAWER_CLOSE } from "../actions/DrawerAction";
import { TOGGLE_HOVER_OPEN, TOGGLE_HOVER_CLOSE } from "../actions/DrawerAction";

const initialState = {
    openDrawer: false,
    onHover:false
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

            case TOGGLE_HOVER_OPEN:
                return {
                    ...state,
                    onHover: true
                }
    
            case TOGGLE_HOVER_CLOSE:
                return {
                    ...state,
                    onHover: false
                }

        default: return state
    }
};

export default DrawerReducer;