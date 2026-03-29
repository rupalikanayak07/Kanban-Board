import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",

  });

  const { username, email, password } = formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!username || !email || !password) {
        toast.error('all fields are required')
        return
      }
      const { data } = await axios.post('http://127.0.0.1:8000/api/auth/register/', formData)
      setFormData({
        username: "",
        email: "",
        password: "",
        

      })
      console.log(formData)
      navigate('/')

      toast.success('register successfully')
    } catch (error) {
      console.log(error);

    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-[350px]">

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            className="w-full bg-purple-400 hover:bg-purple-500 text-white py-2 rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-800">
          Already have an account?{" "}
          <span className="text-purple-900  cursor-pointer hover:underline">
            <Link to='/'>Login</Link>
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;