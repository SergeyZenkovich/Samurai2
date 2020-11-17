import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import MessageBlock from './MessageBlock/MessageBlock';

const Dialogs = (props) => {
    let dialogsElements = props.dialogs.dialogsData.map(dialogElement => <DialogItem key={dialogElement.id} name={dialogElement.name} id={dialogElement.id} />);
    let messagesElements = props.dialogs.messagesData.map(messageElement => <MessageItem key={messageElement.id} messageText={messageElement.message} />);
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <MessageBlock addMessage={props.addMessage} />
        </div>
    )
}
export default Dialogs;