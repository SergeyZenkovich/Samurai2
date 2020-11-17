import React from 'react';
import s from './About.module.css';
import UserMainData from './UserMainData/UserMainData';
import UserDescription from './UserDescription/UserDescription';
import UserInfo from './UserInfo/UserInfo';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import DescriptionForm from './DescriptionForm';


const About = (props) => {

  const onSubmit = (formData) => {
    props.saveProfile(formData);
  }

  return (
    <div className={s.contentDescription}>
      <div className={s.statusAndPhotoBlock}>
        <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} isOwner={props.isOwner} />
        <UserMainData fullName={props.profile.fullName} photo={props.profile.photos.large ? props.profile.photos.large : 'https://virl.bc.ca/wp-content/uploads/2019/01/AccountIcon2.png'} isOwner={props.isOwner} savePhoto={props.savePhoto} />
      </div>
      {props.isEditMode ?
        <div>
          <DescriptionForm onSubmit={onSubmit} initialValues={props.profile} contacts={props.profile.contacts} />
        </div> :
        <div className={s.descriptionBlock}>
          <UserDescription lookingForAJob={props.profile.lookingForAJob} lookingForAJobDescription={props.profile.lookingForAJobDescription} aboutMe={props.profile.aboutMe} />
          <UserInfo contacts={props.profile.contacts} />
          {props.isOwner && <button className={s.editStartButton} onClick={props.startEditProfile}>Edit</button>}
        </div>

      }

    </div>
  )
}
export default About;