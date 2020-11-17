import React from 'react';
import s from './Friends.module.css';
import Friend from './FriendItem/Friend';

const Friends = (props) => {
    let friendsItems = props.sidebar.friends.map(friendsItem => <Friend key={friendsItem.id} name={friendsItem.name} />);
    return (
        <div className={s.friends}>
            Friends
            <div className={s.friendsInner}>
                {friendsItems}
            </div>
        </div>
    )
}
export default Friends;