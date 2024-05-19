import React, { useState } from 'react';
import axios from 'axios';

export default function CreateComment({ postId }) {
  const [formData, setFormData] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:3031/api/${postId}/comments`,
        {
          comment: formData,
        }
      );
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-comment-form">
      <label htmlFor="comment">Create comment:</label>
      <input
        type="text"
        name="comment"
        id="comment"
        value={formData}
        onChange={(e) => setFormData(e.target.value)}
      />
      <button>submit</button>
    </form>
  );
}
