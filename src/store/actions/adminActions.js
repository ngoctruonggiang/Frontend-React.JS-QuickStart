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
//Code chuan cua redux : start (khai bao action) - doing (reducer xu li action) - end (luu vao state