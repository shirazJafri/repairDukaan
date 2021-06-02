import axios from "axios"
import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./userTypes"

const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = userInfo => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: userInfo
    }
}

const fetchUserFailure = error => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

export const getUserInfo = (token) => {
    return (dispatch) => {
        dispatch(fetchUserRequest())
        axios.get("http://192.168.1.108:3000/api/customer/getprofile", {
                headers: {
                    "token": token
                }
            })
            .then((response) => {
                console.log(response)
                dispatch(fetchUserSuccess(response.data))
            })
            .catch((error) => {
                dispatch(fetchUserFailure(response.message))
            })
    }
}