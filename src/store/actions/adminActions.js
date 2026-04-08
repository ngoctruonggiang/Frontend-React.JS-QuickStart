import actionTypes from "./actionTypes";
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService } from "../../services/userService";
import { toast } from "react-toastify";

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

export const createNewUser = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.CREATE_USER_START });
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Create new user success');
                dispatch(createNewUserSuccess(res.data)); //dung keyword dispatch de gui action toi reducer
                dispatch(fetchAllUsersStart()); // Fetch new list of users after successful creation
            } else {
                dispatch(createNewUserFailed())
            }
        } catch (e) {
            console.log(e);
            dispatch(createNewUserFailed())
        }
    }
}
export const createNewUserSuccess = (userData) => {
    return {
        type: actionTypes.CREATE_USER_SUCCESS,
        dataUser: userData
    }
}
export const createNewUserFailed = () => {
    return {
        type: actionTypes.CREATE_USER_FAILED
    }
}

export const fetchAllUsersStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_USERS_START });
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                toast.success('Fetch all users success');
                dispatch(fetchAllUsersSuccess(res.users.reverse()))//dung keyword dispatch de gui action toi reducer
            } else {
                toast.error('Fetch all users failed');
                dispatch(fetchAllUsersFailed())
            }
        } catch (e) {
            console.log(e);
            toast.error('Fetch all users failed');
            dispatch(fetchAllUsersFailed())
        }
    }
}
export const fetchAllUsersSuccess = (usersData) => {
    return {
        type: actionTypes.FETCH_ALL_USERS_SUCCESS,
        dataUser: usersData
    }
}
export const fetchAllUsersFailed = () => {
    return {
        type: actionTypes.FETCH_ALL_USERS_FAILED
    }
}

export const deleteUser = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.DELETE_USER_START });
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Delete user success');
                dispatch(deleteUserSuccess(res.data)); //dung keyword dispatch de gui action toi reducer
                dispatch(fetchAllUsersStart()); // Fetch new list of users after successful deletion
            } else {
                toast.error('Delete user failed');
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            console.log(e);
            toast.error('Delete user failed');
            dispatch(deleteUserFailed())
        }
    }
}
export const deleteUserSuccess = (userData) => {
    return {
        type: actionTypes.DELETE_USER_SUCCESS,
        dataUser: userData
    }
}
export const deleteUserFailed = () => {
    return {
        type: actionTypes.DELETE_USER_FAILED
    }
}

export const editUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.EDIT_USER_START });
            let res = await editUserService(userData);
            if (res && res.errCode === 0) {
                toast.success('Edit user success');
                dispatch(editUserSuccess(res.data)); //dung keyword dispatch de gui action toi reducer
                dispatch(fetchAllUsersStart()); // Fetch new list of users after successful deletion
            } else {
                toast.error('Edit user failed');
                dispatch(editUserFailed())
            }
        } catch (e) {
            console.log(e);
            toast.error('Edit user failed');
            dispatch(editUserFailed())
        }
    }
}
export const editUserSuccess = (userData) => {
    return {
        type: actionTypes.EDIT_USER_SUCCESS,
        dataUser: userData
    }
}
export const editUserFailed = () => {
    return {
        type: actionTypes.EDIT_USER_FAILED
    }
}
//Code chuan cua redux : start (khai bao action) - doing (reducer xu li action) - end (luu vao state