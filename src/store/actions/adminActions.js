import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";

// export const fetchGenderStart = () => {
//     return {
//         type: actionTypes.FETCH_GENDER_START
//     }
// }
export const fetchGenderStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))//dung keyword dispatch de gui action toi reducer
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            console.log(e);
            dispatch(fetchGenderFailed())
        }
    }
}
export const fetchGenderSuccess = (genderData) => {
    return {
        type: actionTypes.FETCH_GENDER_SUCCESS,
        dataGender: genderData
    }
}
export const fetchGenderFailed = () => {
    return {
        type: actionTypes.FETCH_GENDER_FAILED
    }
}

export const fetchPositionStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START });
            let res = await getAllCodeService('position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))//dung keyword dispatch de gui action toi reducer
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            console.log(e);
            dispatch(fetchPositionFailed())
        }
    }
}
export const fetchPositionSuccess = (positionData) => {
    return {
        type: actionTypes.FETCH_POSITION_SUCCESS,
        dataPosition: positionData
    }
}
export const fetchPositionFailed = () => {
    return {
        type: actionTypes.FETCH_POSITION_FAILED
    }
}

export const fetchRoleStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START });
            let res = await getAllCodeService('role');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))//dung keyword dispatch de gui action toi reducer
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            console.log(e);
            dispatch(fetchRoleFailed())
        }
    }
}
export const fetchRoleSuccess = (roleData) => {
    return {
        type: actionTypes.FETCH_ROLE_SUCCESS,
        dataRole: roleData
    }
}
export const fetchRoleFailed = () => {
    return {
        type: actionTypes.FETCH_ROLE_FAILED
    }
}
//Code chuan cua redux : start (khai bao action) - doing (reducer xu li action) - end (luu vao state