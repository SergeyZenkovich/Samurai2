import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/helpers/ObjectHelper";

const FOLLOW = 'samuraiNetwork/usersReducer/FOLLOW';
const UNFOLLOW = 'samuraiNetwork/usersReducer/UNFOLLOW';
const SET_USERS = 'samuraiNetwork/usersReducer/SET-USERS';
const SET_CURRENT_PAGE = 'samuraiNetwork/usersReducer/SET-CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'samuraiNetwork/usersReducer/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'samuraiNetwork/usersReducer/TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'samuraiNetwork/usersReducer/TOGGLE-IS-FOLLOWING-PROGRESS'

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingProgress: []
};



const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.userID, { followed: true })
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.userID, { followed: false })
            };
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.number
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingProgress: action.isFetching
                    ? [...state.followingProgress, action.userId] :
                    state.followingProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

const followUser = (userID) => ({ type: FOLLOW, userID });
const unfollowUser = (userID) => ({ type: UNFOLLOW, userID });
const setUsers = (users) => ({ type: SET_USERS, users });
const setCurrentPage = (number) => ({ type: SET_CURRENT_PAGE, number });
const setTotalCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
const toggleIsFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export { followUser, unfollowUser, setUsers, setCurrentPage, setTotalCount, toggleIsFetching, toggleIsFollowingProgress }

export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(page, pageSize);
    dispatch(setUsers(data.items));
    const totalUsersCount = data.totalCount;
    dispatch(setTotalCount(totalUsersCount));
    dispatch(toggleIsFetching(false));
}

const followUnfollowFlow = async (dispatch, id, apiMethod, actionCreator) => {

    dispatch(toggleIsFollowingProgress(true, id));
    const resultCode = await apiMethod(id);
    if (resultCode === 0) {
        dispatch(actionCreator(id));
    }
    dispatch(toggleIsFollowingProgress(false, id));
}

export const unfollowing = (id) => async (dispatch) => {
    const apiMethod = usersAPI.unfollowUser;
    followUnfollowFlow(dispatch, id, apiMethod, unfollowUser);
}
export const following = (id) => async (dispatch) => {
    const apiMethod = usersAPI.followUser;
    followUnfollowFlow(dispatch, id, apiMethod, followUser);
}

export default usersReducer;