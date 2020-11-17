import { getUserIfLogin } from "./authReducer";

const INITIALIZED_SUCCESS = 'samuraiNetwork/appReducer/INITIALIZED-SUCCESS';
const ERROR_CATCHED = 'samuraiNetwork/appReducer/ERROR_CATCHED'

let initialState = {
    initialized: false,
    globalErrorMessage: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {

                ...state,
                initialized: true,
            };
        }
        case ERROR_CATCHED: {

            return {
                ...state,
                globalErrorMessage: action.errorMessage
            }
        }

        default:
            return state;
    }
}

const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });
const handleError = (errorMessage) => ({ type: ERROR_CATCHED, errorMessage });
export { initializedSuccess }

export const initializeApp = () => async (dispatch) => {
    const promise = await dispatch(getUserIfLogin());
    await Promise.all([promise])
    dispatch(initializedSuccess());
}
export const catchUnhandledErrors = (errorMessage) => async (dispatch) => {
    dispatch(handleError(errorMessage));
}


export default appReducer;