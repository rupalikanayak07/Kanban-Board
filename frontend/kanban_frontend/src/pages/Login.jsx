import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate()
  const [formdata, setformdata] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setformdata({ ...formdata, [name]: value })
  }

  const handleForm = async (e) => {
    e.preventDefault()

    try {

      const { data } = await axios.post("http://127.0.0.1:8000/api/auth/login/", formdata, {
        headers: {
          "Content-Type": "application/json",
        }
      }
      )

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      toast.success('login sucessfully 🎉', { position: 'top-right' })

      navigate('/dashboard')

      setformdata({
        username: "",
        password: ""
      })

    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error("Invalid username or password ❌");
      } else {
        toast.error("Server error ⚠️");
      }
    }

  }




  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-[350px]">

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Welcome Back
        </h2>
        <form className="space-y-5" onSubmit={handleForm}>
          <input
            type="text"
            placeholder="Username"
            name='username'
            value={formdata.username}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          <input
            type="password"
            placeholder="Password"
            name='password'
            value={formdata.password}
            onChange={handleChange}
            className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          <button
            className="w-full bg-purple-400 hover:bg-purple-500 text-white py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <span className="text-purple-500 cursor-pointer hover:underline">
            <Link to="/register">Register</Link>
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;