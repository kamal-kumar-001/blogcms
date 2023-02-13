import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
const sqlite3 = require('sqlite3').verbose();

const Home = ({ blogs, categories }) => {

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     const res = await axios.get("http://localhost:3000/api/getBlogs");
  //     setBlogs(res.data.blogs);
  //   };

  //   fetchBlogs();
  // }, []);

  // const [blogData, setBlogs] = useState([]);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/deleteApi?id=${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();

    if (res.ok) {
      console.log(data.message);
      Router.push('/');
    } else {
      console.error(data.message);
    }
  };

  return (
    <div>
      <Link href={"/blog"}>
        <button className="m-4 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
          Add Blog
        </button>
      </Link>
      <Link href={"/addCategory"}>
        <button className="m-4 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
          Add Category
        </button>
      </Link>
      <Link href={"/addUser"}>
        <button className="m-4 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
          Add User
        </button>
      </Link>
      <table className="table-auto w-full text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id} className="border-t border-gray-700">
              <td className="px-4 py-2">{blog.title}</td>
              {/* <td className="px-4 py-2">{blog.body}</td> */}
              <td className="px-4 py-2">
                {
                  blog.category_ids.split(",").map(id => {
                    const category = categories.find(category => category.id === parseInt(id));
                    return (
                      <span style={{ color: `${category.color}`}} className='mx-2' key={parseInt(id)}>
                        {category ? category.name : "Unknown"}
                      </span>
                    )
                  })
                }
              </td>
              <td className="px-4 py-2">{blog.user_name}</td>
              <td className="px-4 py-2 w-10">
                <img src={`/images/${blog.image}`} alt={blog.title} /></td>
              <td className="px-4 py-2">
                <Link href={"/"}>
                  <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
                    Update
                  </button>
                </Link>
                <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded ml-2"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='bottom-5 right-5 fixed'>
      {/* <iframe width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/450670e1-8be1-4635-8543-7def3131ceff"></iframe> */}
      </div>
    </div>
  );
};
// export async function getServerSideProps() {
//   const response = await axios.get('http://localhost:3000/api/getBlogs');
//   const blogs = response.data.blogs;

//   return {
//     props: {
//       blogs,
//     },
//   };
// }
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
  const blogs = await new Promise((resolve, reject) => {
    db.all(`
    SELECT blogs.*, 
  GROUP_CONCAT(categories.name) as category_names, 
  users.name as user_name 
  FROM blogs 
    INNER JOIN users ON blogs.user_id = users.id
    INNER JOIN blog_categories ON blogs.id = blog_categories.blog_id
    INNER JOIN categories ON blog_categories.category_id = categories.id 
    GROUP BY blogs.id
    `, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
  return {
    props: {
      categories,
      blogs,
    },
  };
}
export default Home;
