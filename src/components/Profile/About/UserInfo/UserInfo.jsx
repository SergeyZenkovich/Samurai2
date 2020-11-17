import React from 'react';
import s from './../About.module.css';

const UserInfo = (props) => {
  return (
    <div className={s.userInfo}>
      <div className={s.socials}>
        {Object.keys(props.contacts).map(key => props.contacts[key] && <Contact key={key} contactTitle={key} contactValue={props.contacts[key]} />)}
      </div>
    </div>
  )
}
const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contactBlock}>
      <b>{contactTitle}: </b> <a href={`http://${contactValue}`} target='_blank' rel="noopener noreferrer"><div className={s[contactTitle]} ></div></a>
    </div>

  )
}



export default UserInfo;