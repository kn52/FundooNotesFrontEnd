import {CURRENT_LABEL_PAGE} from '../actions/LabelAction'

const initialState = {
    currentLabelId : 'Fundoo'
}

const LabelsReducer = ( state = initialState, action) => {
    switch (action.type) {
        case CURRENT_LABEL_PAGE:
            return {
                ...state,
                currentLabelId: action.payload
            }
    
        default: return state
    }
};

export default LabelsReducer;