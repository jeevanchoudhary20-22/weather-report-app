import { actionTypes } from "./actions";

const initialState = {
    units: '',
    data: [],
    zipCode: '',
    city: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.UPDATE_STORE_OBJ):
            return {
                ...state,
                ...action.payload
            };

        default:
            return state
    }
};

export default reducer