import actionTypes from "./actionTypes";
import { getAllSpecialtyService } from "../../services/userService";
import { toast } from "react-toastify";

export const fetchTopSpecialty = () => {
    return async (dispatch) => {
        try {
            let res = await getAllSpecialtyService();
            if (res && res.errCode === 0) {
                toast.success("Get top specialty success");
                dispatch({ type: actionTypes.FETCH_TOP_SPECIALTY_SUCCESS, data: res.data });
            } else {
                toast.error("Get top specialty failed");
                dispatch({ type: actionTypes.FETCH_TOP_SPECIALTY_FAILED });
            }
        } catch (error) {
            console.log(error);
            toast.error("Get top specialty failed");
            dispatch({ type: actionTypes.FETCH_TOP_SPECIALTY_FAILED });
        }
    };
};

