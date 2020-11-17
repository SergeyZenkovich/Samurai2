import React from 'react';
import User from './User/User';
import iconPhoto from '../../assets/images/user_icon.png'
import s from './Users.module.css';
import { PaginatorNew } from '../common/Paginator';

const Users = ({ totalUsersCount, pageSize, currentPage, onPageChanged, users, unfollowUser, followUser, followingProgress, unfollowing, following, ...props }) => {

    return (

        <div className={s.usersBlock}>
            <PaginatorNew totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
            {users.map(user => <User key={user.id} id={user.id} followed={user.followed}
                photo={user.photos.small ? user.photos.small : iconPhoto} fullName={user.name}
                status={user.status} country={user.country} city={user.city} followUser={followUser}
                unfollowUser={unfollowUser}
                followingProgress={followingProgress}
                unfollowing={unfollowing} following={following}
            />)}
        </div >
    )
}

export default Users;