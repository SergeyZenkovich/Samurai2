import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";


let store = {
    _state: {
        profile: {
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
            newPostText: 'it-kamasutra.com'
        },
        dialogs: {
            dialogsData: [
                {
                    id: 1,
                    name: 'Dimych'
                },
                {
                    id: 2,
                    name: 'Romchick'
                },
                {
                    id: 3,
                    name: 'Egor'
                },
                {
                    id: 4,
                    name: 'Vlados'
                }
            ],
            newMessageText: 'Hello Samurai!',
            messagesData: [
                {
                    id: 1,
                    message: 'Hi'
                },
                {
                    id: 2,
                    message: 'How its going?'
                },
                {
                    id: 3,
                    message: 'How is Dimych?'
                },
                {
                    id: 4,
                    message: 'Yo'
                }
            ],
        },
        sidebar: {
            friends: [
                {
                    id: 1,
                    name: 'Dimych'
                },
                {
                    id: 2,
                    name: 'Romchick'
                },
                {
                    id: 3,
                    name: 'Egor'
                },
                {
                    id: 4,
                    name: 'Vlados'
                },
                {
                    id: 5,
                    name: 'Max'
                },
                {
                    id: 6,
                    name: 'Denis'
                }
            ]
        }
    },
    _callSub() {
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSub = observer;
    },
    addPostState() {
        let index = this._state.profile.postsData[this._state.profile.postsData.length - 1].id;
        let newPost = {
            id: index + 1,
            message: this._state.profile.newPostText,
            likesCounter: 0
        };
        this._state.profile.postsData.push(newPost);
        this._state.profile.newPostText = '';
        this._callSub(this._state);
    },
    addMessageState() {
        let index = this._state.dialogs.messagesData[this._state.dialogs.messagesData.length - 1].id;
        let newMessage = {
            id: index + 1,
            message: this._state.dialogs.newMessageText
        }
        this._state.dialogs.messagesData.push(newMessage);
        this._state.dialogs.newMessageText = '';
        this._callSub(this._state);
    },
    updateTextArea(text) {
        this._state.profile.newPostText = text;
        this._callSub(this._state);
    },
    updateMessageArea(text) {
        this._state.dialogs.newMessageText = text;
        this._callSub(this._state);
    },
    dispatch(action) {
        this._state.profile = profileReducer(this._state.profile, action);
        this._state.dialogs = dialogsReducer(this._state.dialogs, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSub(this._state);
    }

}

export default store;

// dispatch old
 // if (action.type === ADD_POST) {
        //     let index = this._state.profile.postsData[this._state.profile.postsData.length - 1].id;
        //     let newPost = {
        //         id: index + 1,
        //         message: this._state.profile.newPostText,
        //         likesCounter: 0
        //     };
        //     this._state.profile.postsData.push(newPost);
        //     this._state.profile.newPostText = '';
        //     this._callSub(this._state);
        // }
        // else if (action.type === UPDATE_TEXT_AREA) {
        //     this._state.profile.newPostText = action.text;
        //     this._callSub(this._state);
        // }
        // else if (action.type === ADD_MESSAGE_STATE) {
        //     let index = this._state.dialogs.messagesData[this._state.dialogs.messagesData.length - 1].id;
        //     let newMessage = {
        //         id: index + 1,
        //         message: this._state.dialogs.newMessageText
        //     }
        //     this._state.dialogs.messagesData.push(newMessage);
        //     this._state.dialogs.newMessageText = '';
        //     this._callSub(this._state);
        // }
        // else if (action.type === UPDATE_MESSAGE_AREA) {
        //     this._state.dialogs.newMessageText = action.text;
        //     this._callSub(this._state);
        // }

        //old export before store 

// export { addPostState, updateTextArea, addMessageState, updateMessageArea, subscribe };

