import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    genders: [],
    roles: [],
    positions: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) { //check action nao duoc gui toi dua vao action.type de xu ly phu hop
        case actionTypes.FETCH_GENDER_START:
            console.log('fire action fetch gender start', action);
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genders = action.dataGender;
            console.log('fire action fetch gender success', copyState);
            return copyState;//luon luon return state moi khac init state

        case actionTypes.FETCH_GENDER_FAILED:
            console.log('fire action fetch gender failed', action);
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;