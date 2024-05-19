import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import CreateComment from './CreateComment';
Comments

export default function PostsList() {
  const [postsList, setPostsList] = useState({});

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get('http://localhost:3034/api/posts');
        setPostsList(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPosts();
  }, []);


  const postsElements = Object.values(postsList).map((post) => (
    <div className="post-it" key={post.postId}>
      <h3>{post.post}</h3>
      <Comments comments={post.comments}/>
      <CreateComment postId={post.postId}/>
    </div>
  ));

  return (
    <div className="post-list">
      <h1>All posts</h1>
      {postsElements}
    </div>
  );
}
