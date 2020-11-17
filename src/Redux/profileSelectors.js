const getProfile = (state) => {
    return state.profile.profile;
}
const getStatus = (state) => {
    return state.profile.status;
}
const getUserId = (state) => {
    return state.auth.id;
}
const getIsUserAuth = (state) => {
    return state.auth.isAuth;
}
const getIsEditMode = (state) => {
    return state.profile.editMode;
}

export { getProfile, getStatus, getUserId, getIsUserAuth, getIsEditMode }