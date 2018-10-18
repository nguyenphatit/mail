import { SET_CURRENT_USER, AUTHENTICATE } from './../constants/ActionType';
import isEmpty from './../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {}
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        
        case AUTHENTICATE:
            return {
                ...state,
                userInfo: action.payload
            }

        default:
            return state;
    }
}

export default authReducer;