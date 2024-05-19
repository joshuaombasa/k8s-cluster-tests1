import React from 'react';

export default function Comments({ comments }) {
  const commentsElements = comments.map((comment) => {
    const commentsStyles = {
      color: comment.status === 'rejected' ? 'red' : 'blue',
    };
    return (
      <li className="" key={comment.id}>
        {comment.status !== 'rejected' ? (
          <p style={commentsStyles}>{comment.comment}</p>
        ) : (
          <p style={commentsStyles}>Comment rejected</p>
        )}
      </li>
    );
  });

  return (
    <div className="">
      <ul>{commentsElements}</ul>
    </div>
  );
}
