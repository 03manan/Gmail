import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setAuthUser } from '../redux/appSlice';


const Login = () => {

  const [input, setInput] = useState({
    email:"",
    password:""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/login", input, {
        headers:{
          'Content-Type' : "application/json"
        },
        withCredentials: true
      });
      if(res.data.success){
          dispatch(setAuthUser(res.data.user));
          navigate("/");
          toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }


  return (
    <div className='flex items-center justify-center w-full h-screen'>
      
        <form onSubmit={submitHandler} className='flex flex-col gap-3 bg-white p-4 w-[25%] rounded-md'>
        <h1 className='text-center font-medium my-2 text-2xl'>Login</h1>
            <input onChange={changeHandler} value={input.email} name='email' type="email" placeholder='Email' className='border border-gray-400 rounded-md px-2 py-1'/>
            <input onChange={changeHandler} value={input.password} name='password' type="password" placeholder='Password' className='border border-gray-400 rounded-md px-2 py-1'/>
            <button  type='submit' className='bg-gray-800 text-white rounded-md p-2 mb-4' >
                Login
            </button>
            <p>Don't have an an account? <Link to={"/signup"} className='text-blue-600 m-1'>Signup</Link></p>
        </form>

    </div>
  )
}

export default Login