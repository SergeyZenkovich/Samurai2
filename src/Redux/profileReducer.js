import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = 'samuraiNetwork/profileReducer/ADD-POST';
const SET_USER_PROFILE = 'samuraiNetwork/profileReducer/SET-USER-PROFILE';
const SET_STATUS = 'samuraiNetwork/profileReducer/SET-STATUS';
const DELETE_POST = 'samuraiNetwork/profileReducer/DELETE-POST';
const SET_PHOTO = 'samuraiNetwork/profileReducer/SET-PHOTO';
const START_EDIT_MODE = 'samuraiNetwork/profileReducer/START_EDIT_MODE';
const END_EDIT_MODE = 'samuraiNetwork/profileReducer/END_EDIT_MODE';

let initialState = {
    postsData: [
        {
            id: 1,
            message: 'Hi, how are you?',
            likesCounter: 15
        },
        {
            id: 2,
            message: "It's my first post",
            likesCounter: 20
        }
    ],
    profile: null,
    status: '',
    editMode: false
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let index = state.postsData[state.postsData.length - 1].id;
            let newPost = {
                id: index + 1,
                message: action.newPost,
                likesCounter: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            }
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_PHOTO: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photo }
            }
        }
        case START_EDIT_MODE: {
            return {
                ...state,
                editMode: true
            }
        }
        case END_EDIT_MODE: {
            return {
                ...state,
                editMode: false
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            }
        }

        default:
            return state;
    }
}

const addPost = (newPost) => ({ type: ADD_POST, newPost });
const deletePost = (postId) => ({ type: DELETE_POST, postId });
const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
const setStatus = (status) => ({ type: SET_STATUS, status });
const savePhotoSuccess = (photo) => ({ type: SET_PHOTO, photo });
const startEditProfile = () => ({ type: START_EDIT_MODE });
const completeEditProfile = () => ({ type: END_EDIT_MODE });

export {
    addPost, setUserProfile, deletePost, startEditProfile
}

export const getUserProfile = (id) => async (dispatch) => {
    const response = await profileAPI.getUserProfile(id)
    dispatch(setUserProfile(response.data));
}
export const getUserStatus = (id) => async (dispatch) => {
    const response = await profileAPI.getStatus(id)
    dispatch(setStatus(response.data))
}
export const updateUserStatus = (status) => async (dispatch) => {
    const resultCode = await profileAPI.updateStatus(status)
    if (resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (file) => async (dispatch) => {
    const data = await profileAPI.savePhotoOnServer(file)
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));

    }
}
export const saveProfile = (newProfileObject) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfileOnServer(newProfileObject);
    if (response.data.resultCode === 0) {
        dispatch(completeEditProfile());
        dispatch(getUserProfile(userId));

    }
    else {
        const message = response.data.messages.length > 0 ? response.data.messages[0] : 'SIMP';
        const parsed = urlErrorParser(message);
        dispatch(stopSubmit('editProfile', { 'contacts': { [parsed]: messageParser(message) } }));
        return Promise.reject(message);
    }
}
const urlErrorParser = (message) => {
    return message.includes('Contacts->') ? message.slice(message.indexOf('->') + 2, message.indexOf(')')).toLowerCase() : message;
}
const messageParser = (message) => message.split('(')[0];

export default profileReducer;