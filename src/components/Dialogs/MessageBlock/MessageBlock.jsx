import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './MessageBlock.module.css';
import { FormControl } from '../../common/FormsControls/FormsControls';
import { maxLengthCreator, requiredField } from '../../../utils/validators/validators';

const maxLength100 = maxLengthCreator(100);

const MessageBlock = (props) => {
    let addMessage = (values) => {
        props.addMessage(values.message);

    }
    return (
        <ReduxMessageFrom onSubmit={addMessage} />
    )
}

const MessageForm = (props) => {
    return (
        <form action="" onSubmit={props.handleSubmit} className={s.CreateBlock}>
            <Field component={FormControl} validate={[requiredField, maxLength100]} className={s.textarea} type="text" name="message" placeholder="Yooooooooo samurai" fieldtype="textarea" />
            <button className={s.sendButton}> Send </button>
        </form>
    )
}
const ReduxMessageFrom = reduxForm({
    form: 'messageForm'
})(MessageForm);

export default MessageBlock;