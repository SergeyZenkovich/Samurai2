import React from 'react';
import s from './User.module.css';
import { NavLink } from 'react-router-dom';


const User = (props) => {
    return (
        <div className={s.userBlock}>
            <NavLink to={`/profile/${props.id}`}>
                <img src={props.photo} alt="" />
            </NavLink>

            <div className={s.userInfoBlock}>
                <div className={s.userName}>{props.fullName}</div>
                <div>{props.status}</div>
                {props.followed ? <button className={s.unfollowed} disabled={props.followingProgress.some(id => id === props.id)} onClick={() => {
                    props.unfollowing(props.id);
                }
                }>Unfollow</button> : <button className={s.followed} disabled={props.followingProgress.some(id => id === props.id)} onClick={() => {
                    props.following(props.id);
                }}>Follow</button>}
            </div>
        </div>
    )
}
export default User;