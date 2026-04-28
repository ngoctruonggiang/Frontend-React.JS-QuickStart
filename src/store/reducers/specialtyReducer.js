import actionTypes from '../actions/actionTypes';

const initialState = {
    topSpecialty: [],
}

const specialtyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TOP_SPECIALTY_SUCCESS:
            return {
                ...state,
                topSpecialty: action.data
            }
        case actionTypes.FETCH_TOP_SPECIALTY_FAILED:
            return {
                ...state,
                topSpecialty: []
            }
        default:
            return state;
    }
}

export default specialtyReducer;