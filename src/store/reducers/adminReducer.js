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
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    users: [],
    isLoadingUsers: false,
    topDoctors: [],
    isLoadingTopDoctors: false,
    allDoctors: [],
    isLoadingAllDoctors: false,
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) { //check action nao duoc gui toi dua vao action.type de xu ly phu hop
        case actionTypes.FETCH_GENDER_START: {
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return copyState;
        }

        case actionTypes.FETCH_GENDER_SUCCESS: {
            let copyState = { ...state };
            copyState.genders = action.dataGender;
            copyState.isLoadingGender = false;
            return copyState;//luon luon return state moi khac init state
        }

        case actionTypes.FETCH_GENDER_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingGender = false;
            copyState.genders = [];
            return copyState;
        }

        case actionTypes.FETCH_POSITION_START: {
            let copyState = { ...state };
            copyState.isLoadingPosition = true;
            return copyState;
        }

        case actionTypes.FETCH_POSITION_SUCCESS: {
            let copyState = { ...state };
            copyState.positions = action.dataPosition;
            copyState.isLoadingPosition = false;
            return copyState;//luon luon return state moi khac init state
        }

        case actionTypes.FETCH_POSITION_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingPosition = false;
            copyState.positions = [];
            return copyState;
        }

        case actionTypes.FETCH_ROLE_START: {
            let copyState = { ...state };
            copyState.isLoadingRole = true;
            return copyState;
        }

        case actionTypes.FETCH_ROLE_SUCCESS: {
            let copyState = { ...state };
            copyState.roles = action.dataRole;
            copyState.isLoadingRole = false;
            return copyState;//luon luon return state moi khac init state
        }

        case actionTypes.FETCH_ROLE_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingRole = false;
            copyState.roles = [];
            return copyState;
        }

        case actionTypes.FETCH_ALL_USERS_START: {
            let copyState = { ...state };
            copyState.isLoadingUsers = true;
            return copyState;
        }

        case actionTypes.FETCH_ALL_USERS_SUCCESS: {
            let copyState = { ...state };
            copyState.users = action.dataUser;
            copyState.isLoadingUsers = false;
            return copyState;//luon luon return state moi khac init state
        }

        case actionTypes.FETCH_ALL_USERS_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingUsers = false;
            copyState.users = [];
            return copyState;
        }

        case actionTypes.FETCH_TOP_DOCTOR_START: {
            let copyState = { ...state };
            copyState.isLoadingTopDoctors = true;
            return copyState;
        }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS: {
            let copyState = { ...state };
            copyState.topDoctors = action.dataDoctor;/*action la object duoc dispatch tu adminAction === {type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS, dataDoctor: doctorData}*/
            copyState.isLoadingTopDoctors = false;
            return copyState;//luon luon return state moi khac init state
        }

        case actionTypes.FETCH_TOP_DOCTOR_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingTopDoctors = false;
            copyState.topDoctors = [];
            return copyState;
        }

        case actionTypes.FETCH_ALL_DOCTORS_START: {
            let copyState = { ...state };
            copyState.isLoadingAllDoctors = true;
            return copyState;
        }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS: {
            let copyState = { ...state };
            copyState.allDoctors = action.dataDoctor;/*action la object duoc dispatch tu adminAction === {type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS, dataDoctor: doctorData}*/
            copyState.isLoadingAllDoctors = false;
            return copyState;//luon luon return state moi khac init state
        }

        case actionTypes.FETCH_ALL_DOCTORS_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingAllDoctors = false;
            copyState.allDoctors = [];
            return copyState;
        }
        default:
            return state;
    }
}

export default adminReducer;