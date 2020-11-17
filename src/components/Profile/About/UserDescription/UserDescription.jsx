import React from 'react';
import s from './../About.module.css';


const UserDescription = (props) => {
  return (
    <div className={s.description}>
      <div className={s.aboutMe}>
        <b>About me: </b>
        <span>{props.aboutMe}</span>
      </div>
      <div className={s.userJob}>
        <p> <b>Looking for a job: </b>  <span> {props.lookingForAJob ? 'Yes' : 'No'}</span> </p>
        {props.lookingForAJob && <p><b>Description: </b>{props.lookingForAJobDescription}</p>}
      </div>
    </div>
  )
}

export default UserDescription;