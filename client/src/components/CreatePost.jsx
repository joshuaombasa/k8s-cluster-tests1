import axios from 'axios';
import React, { useState } from 'react';

export default function CreatePost() {
  const [formData, setFormData] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const res = await axios.post('http://localhost:3030/api/posts', {
        post: formData,
      });
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="create-post-form">
        <label htmlFor="post">Create new post:</label>
        <input
          type="text"
          name="post"
          id="post"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
