import React from 'react';
import s from './Friend.module.css';

const Friend = (props) =>{
    return(
        <div className = {s.friendItem}>
            <div className = {s.avatar}></div>
            <div className = {s.name}>{props.name}</div>
        </div>
    )
}
export default Friend;