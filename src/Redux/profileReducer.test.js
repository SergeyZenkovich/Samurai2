const { default: profileReducer, addPost, deletePost } = require("./profileReducer");

let state = {
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
    status: ''
};


test('ADDING: length of posts should be incremented', () => {
    let action = addPost('Yooooooo');
    let newState = profileReducer(state, action);
    expect(newState.postsData.length).toBe(3);
});
test('message of new post should be correct', () => {
    let action = addPost('Yooooooo');
    let newState = profileReducer(state, action);
    expect(newState.postsData[2].message).toBe('Yooooooo');
});
test('DELETING: length of posts should be decremented', () => {
    let action = deletePost(2)
    let newState = profileReducer(state, action);
    expect(newState.postsData.length).toBe(1);
});
test(`DELETING: length of posts shouldn't decremented if id is incorrect`, () => {
    let action = deletePost(2000)
    let newState = profileReducer(state, action);
    expect(newState.postsData.length).toBe(2);

});