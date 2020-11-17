import React from 'react';
import { reduxForm } from 'redux-form';
import { requiredField } from '../../../utils/validators/validators';
import { CreateField } from '../../common/FormsControls/FormsControls';
import s from './About.module.css';
import styles from '../../common/FormsControls/FormsControls.module.css'

const DescriptionForm = ({ handleSubmit, contacts, error }) => {

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div className={s.aboutMe}>
                    <b>Full name:</b> {CreateField("text", "Full Name", "fullName", [requiredField])}
                </div>
                <div className={s.aboutMe}>
                    <b>About me:</b> {CreateField("text", "About me", "aboutMe", [requiredField])}
                </div>
                <div className={s.userJob}>
                    <b>Looking for a job: </b> {CreateField("checkbox", null, "lookingForAJob", [requiredField])}
                    <b>Description: </b> {CreateField("text", "Professional skills", "lookingForAJobDescription", [requiredField], "textarea")}
                </div>
                <div className={s.socialsEdit}>
                    <p><b>Contacts: </b></p>
                    <div>
                        {Object.keys(contacts).map(key => <ContactEdit name={key} key={key} />)}
                    </div>

                </div>
                {error && <div className = {styles.formSummaryError}>{error}</div> }
                <button className={s.editEndButton}>Confirm Changes</button>
            </form>
            Form

        </div>
    )
}
const ContactEdit = ({ name }) => {
    return (
        <div>
            <b>{name}:</b> {CreateField("text", "https://", `contacts.${name}`, [])}
        </div>
    )
}
const DescriptionReduxForm = reduxForm({ form: 'editProfile' })(DescriptionForm);
export default DescriptionReduxForm;