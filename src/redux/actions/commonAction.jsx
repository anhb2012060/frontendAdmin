import { COMMON_ERROR_SET, COMMON_LOADING_SET, COMMON_MESSAGE_SET } from "./actionTypes"

export const setMessage = (message) => async (dispatch) => {
    dispatch({
        type : COMMON_MESSAGE_SET,
        payload : message,
    })
}

export const setError = (error) => async (dispatch) => {
    dispatch({
        type : COMMON_ERROR_SET,
        payload : error,
    })
}

export const setLoading = (loading) => async (dispatch) => {
    dispatch({
        type : COMMON_LOADING_SET,
        payload : loading,
    })
}