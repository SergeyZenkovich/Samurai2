import React from 'react';
import s from './../Dialogs.module.css';

const MessageItem = (props) => {
    return (
        <div className={s.message}>{props.messageText}</div>
    )
}

export default MessageItem;