const ADD_MESSAGE_STATE = 'samuraiNetwork/dialogsReducer/ADD-MESSAGE-STATE';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE_STATE: {
            let index = state.messagesData[state.messagesData.length - 1].id;
            let newMessage = {
                id: index + 1,
                message: action.newMessageText
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
            };
        }

        default:
            return state;
    }
}

const addMessage = (newMessageText) => ({ type: ADD_MESSAGE_STATE, newMessageText });

export { addMessage }

export default dialogsReducer;