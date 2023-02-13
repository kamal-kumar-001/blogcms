import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
// import bcrypt from 'bcrypt';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [about, setAbout] = useState('');
  const [isEditor, setIsEditor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);

      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('email', email);
      // formData.append('password', hashedPassword);
      // formData.append('slug', slug);
      formData.append('password', password);
      formData.append('about', about);
      formData.append('isEditor', isEditor);
      formData.append('isAdmin', isAdmin);

      const res = await axios.post('/api/userApi', {name: name, email: email, about: about, image: image, password: password, isAdmin: isAdmin, isEditor: isEditor, }, {
      // await axios.post('/api/userApi', formData, {
        // headers: { 'Content-Type': 'multipart/form-data' },
      });

      router.push('/');
      console.log(res.data)
    } catch (err) {
      setError(err.message);
      console.log(err)
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center p-5">
      <div className="bg-white w-1/3 p-10 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-5 text-center">Add User</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              className="block font-bold mb-2 text-gray-700"
              htmlFor="image"
            >
              Image
            </label>
            <input
              type="text"
              className="border border-gray-400 p-2 w-full"
              id="image"
              // value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              className="block font-bold mb-2 text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              className="border border-gray-400 p-2 w-full"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label
              className="block font-bold mb-2 text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              className="border border-gray-400 p-2 w-full"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              className="block font-bold mb-2 text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              className="border border-gray-400 p-2 w-full"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              className="block font-bold mb-2 text-gray-700"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="border border-gray-400 p-2 w-full"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassword !== password && (
              <p className="text-red-500 text-xs mt-2">
                Passwords do not match
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              className="block font-bold mb-2 text-gray-700"
              htmlFor="about"
            >
              About
            </label>
            <textarea
              type="text"
              className="border border-gray-400 p-2 w-full"
              id="about"
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              className="block font-bold mb-2 text-gray-700"
              htmlFor="isEditor"
            >
              Is Editor
            </label>
            <input
              type="checkbox"
              className="mt-1"
              id="isEditor"
              // value={isEditor}
              checked={isEditor}
              onChange={(e) => setIsEditor(e.target.checked)}
            />
          </div>
          <div className="mb-5">
            <label
              className="block font-bold mb-2 text-gray-700"
              htmlFor="isAdmin"
            >
              Is Admin
            </label>
            <input
              type="checkbox"
              className="mt-1"
              id="isAdmin"
              // value={isAdmin}
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </div>
          <div className="mb-5">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
