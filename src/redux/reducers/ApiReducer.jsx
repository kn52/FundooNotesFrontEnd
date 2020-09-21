import { CALL, NO_CALL } from "../actions/ApiAction";

const initialState = {
    apiName:''
}

const ApiReducer = (state = initialState, action) => {
    
    switch(action.type) {
       
        case CALL:
            return {
                ...state,
                apiName: action.payload
            }

        case NO_CALL:
            return {
                ...state,
                apiName: action.payload
            }

        default: return state;
    }
};

export default ApiReducer;