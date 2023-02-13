import React, { useState } from 'react';
import axios from 'axios';
// import sqlite3 from "sqlite3";

const Category = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [slug, setSlug] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('color', color);
      formData.append('slug', slug);
      const res = await axios.post('/api/category', {name: name, color: color, slug: slug });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>

    </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="color">color:</label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="slug">Slug:</label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>
      <button type="submit">Add Category</button>
    </form>
  );
};


export default Category;
