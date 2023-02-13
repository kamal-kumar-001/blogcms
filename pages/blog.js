import React, { useState } from 'react';
import axios from 'axios';
import RichTextEditor from '../components/RichTextEditor'
// import sqlite3 from "sqlite3";
const sqlite3 = require('sqlite3').verbose();

const Blog = ({ categories,users }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [slug, setSlug] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      formData.append('image', image);
      formData.append('slug', slug);
      formData.append('category_ids', selectedCategories.join(','));
      // formData.append('category_ids', JSON.stringify(selectedCategories));
      formData.append('user_id', selectedUsers);
      const res = await axios.post('/api/blogApi', formData);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
    // console.log(selectedCategories.join(','))
    // console.log(selectedUsers)
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl">
      <button type='submit' className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
         Add Blog
    </button>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-400 p-2 w-full"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Image:</label>
        <input
          type="file"
          id="image"
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setImage(URL.createObjectURL(file));
              setImage(file);
            }
          }}
          className="p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="slug" className="block text-gray-700 font-medium mb-2">Slug</label>
<input 
       type="text" 
       id="slug" 
       name="slug" 
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       value={slug}
       onChange={(e) => setSlug(e.target.value)}
     />
</div>
<div className="mb-4">
    <label htmlFor="categories" className="block text-gray-700 font-medium mb-2">
      Categories
    </label>
    <div className="relative">
      <select 
        multiple 
        id="categories" 
        name="categories" 
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        // value={selectedCategories[0]}
        // onChange={(e) => setSelectedCategories(e.target.value)}
        onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}
      >
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </div>
  
  <div className="mb-4">
    <label htmlFor="user" className="block text-gray-700 font-medium mb-2">
      User
    </label>
    <div className="relative">
      <select 
        id="user" 
        name="user" 
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={selectedUsers}
        onChange={(e) => setSelectedUsers(e.target.value)}
      >
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293l-3. 982 3. 982L20. 306l-9. 3-9. 3L9. 293zm0 3. 536L5. 757 0 0 5. 757 9. 829 0 14. 293 5. 757 20 9. 829 14. 293 20 20 14. 293z"/>
          </svg>
        </div>
      </div>
    </div>
    <div className="mb-4">
        <label htmlFor="body" className="block text-gray-700 font-medium mb-2">Body:</label>
        {/* <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border border-gray-400 p-2 w-full h-32"
        /> */}
        <RichTextEditor content={body} setContent={setBody} />
      </div>
    

    </form>
  );
};
export async function getServerSideProps(context) {
 
  const db = new sqlite3.Database('./database/mydb.db', (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  const categories = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM categories', (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
  const users = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
  return {
    props: {
      categories,
      users,
    },
  };
}
export default Blog;

// import React, { useState } from 'react';
// import axios from 'axios';
// // import sqlite3 from "sqlite3";
// const sqlite3 = require('sqlite3').verbose();
// const Blog = ({ categories,users }) => {
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [image, setImage] = useState(null);
//   const [slug, setSlug] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedUser, setSelectedUser] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('body', body);
//       formData.append('image', image);
//       formData.append('slug', slug);
//       formData.append('category_id', selectedCategory);
//       const res = await axios.post('/api/blogApi', formData);
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="title">Title:</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="body">Body:</label>
//         <textarea
//           id="body"
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="image">Image:</label>
//         <input
//           type="file"
//           id="image"
//           onChange={({ target }) => {
//             if (target.files) {
//               const file = target.files[0];
//               setImage(URL.createObjectURL(file));
//               setImage(file);
//             }
//           }}
//         />
//       </div>
//       <div>
//         <label htmlFor="slug">Slug:</label>
//         <input
//           type="text"
//           id="slug"
//           value={slug}
//           onChange={(e) => setSlug(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="category">Category:</label>
//         <select
//         // multiple
//           id="category"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories && categories.map((category) => (
//             <option key={category.id} value={category.id}>{category.name}</option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label htmlFor="user">user:</label>
//         <select
//         // multiple
//           id="user"
//           value={selectedUser}
//           onChange={(e) => setSelectedUser(e.target.value)}
//         >
//           {users && users.map((user) => (
//             <option key={user.id} value={user.id}>{user.name}</option>
//           ))}
//         </select>
//       </div>
//       <button type='submit' className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
//         Add Blog
//       </button>
//     </form>
//   )
// }
// export async function getServerSideProps(context) {
 
//   const db = new sqlite3.Database('./database/mydb.db', (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//   });
//   const categories = await new Promise((resolve, reject) => {
//     db.all('SELECT * FROM categories', (err, rows) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(rows);
//     });
//   });
//   const users = await new Promise((resolve, reject) => {
//     db.all('SELECT * FROM users', (err, rows) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(rows);
//     });
//   });
//   return {
//     props: {
//       categories,
//       users,
//     },
//   };
// }






// export default Blog;


