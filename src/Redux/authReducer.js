import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'samuraiNetwork/authReducer/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samuraiNetwork/authReducer/SET-CAPTCHA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            };
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                captcha: action.captchaUrl
            }
        }
        default:
            return state;
    }
}

const setAuthUserData = (data, isAuth) => ({ type: SET_USER_DATA, data, isAuth });
const setCaptcha = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, captchaUrl })
export { setAuthUserData, setCaptcha }

export const getUserIfLogin = () => async (dispatch) => {
    const data = await authAPI.auth()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(data.data, true));
    }
}

export const logIn = (email, password, rememberMe, captcha) => async (dispatch) => {
    const data = await authAPI.logIn(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
        dispatch(getUserIfLogin());
    }

    else {
        if (data.resultCode === 10) {
            dispatch(getCaptcha());
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'SIMP'
        dispatch(stopSubmit('loginForm', { _error: message }));
    }
}
export const logOut = () => async (dispatch) => {
    const data = await authAPI.logOut();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, false));
    }
}
export const getCaptcha = () => async (dispatch) => {
    const captcha = await securityAPI.getCaptcha();
    dispatch(setCaptcha(captcha.url));
}
export default authReducer