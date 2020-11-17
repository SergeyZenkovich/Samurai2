import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../../utils/validators/validators';
import { FormControl } from '../../common/FormsControls/FormsControls';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const maxLength50 = maxLengthCreator(50);

const MyPosts = React.memo((props) => {
  let postsElements = props.profile.postsData.map(post => <Post key={post.id} message={post.message} likesCounter={post.likesCounter} />);
  let addPost = (values) => {
    props.addPost(values.post);
  }
  return (
    <div className={s.Posts}>
      <PostReduxForm onSubmit={addPost} />
      {postsElements}
    </div>
  )
})
const PostForm = (props) => {
  return (
    <form action="" onSubmit={props.handleSubmit} className={s.CreatePostBlock}>
      <Field className={s.textarea} type="text" name="post" component={FormControl} placeholder="it-kamasutra.com" validate={[requiredField, maxLength50]} fieldtype="textarea" />
      <button className={s.postButton}> Post </button>
    </form>
  )
}

const PostReduxForm = reduxForm({
  form: 'postForm'
})(PostForm)

export default MyPosts;