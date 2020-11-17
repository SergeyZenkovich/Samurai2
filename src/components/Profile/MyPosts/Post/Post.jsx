import React from 'react';
import s from  './Post.module.css';

const Post = (props)=>{
    return (     
        <div className = {s.post}>
          <div className = 'item'>
          <img src="https://virl.bc.ca/wp-content/uploads/2019/01/AccountIcon2.png" alt=""/>
          <span>{props.message}</span>
          </div>
          <div className = {s.options}>
            <span> Likes: {props.likesCounter} </span>
          </div>
          
        </div>       
    
    )
}
export default Post;