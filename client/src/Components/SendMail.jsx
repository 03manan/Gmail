import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import store from '../redux/store';
import { setEmails, setOpen } from '../redux/appSlice';
import toast from 'react-hot-toast';
import axios from 'axios';


const SendMail = () => {
    const {open, emails} = useSelector(store => store.app);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        to:"",
        subject:"",
        message:""
        })

    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/v1/email/create", formData, {
                headers:{
                    'Content-type' : "application/json"
                },
                withCredentials: true
            });
            console.log(res.data);
            dispatch(setEmails([...emails, res.data.email]))
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        dispatch(setOpen(false))
    }


  return (
        <div className={`${open ? 'block' : 'hidden'} bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}>
        <div className='flex items-center justify-between px-3 py-2 bg-[#F2F6FC]'> 
            <h1 className='text-sm text-[#041E49] font-medium'>New Message</h1>
            <div onClick={() => dispatch(setOpen(false))} className='p-2 rounded-full hover:bg-gray-200  hover:cursor-pointer'>
                <RxCross2 size={"20px"}/>
            </div>
        </div>
        <form onSubmit={submitHandler} className='flex flex-col p-3 gap-2'>
            <input onChange={changeHandler} name='to' value={formData.to} type="text" placeholder='to' className='outline-none py-1 h-4'/>
             <hr/>
            <input onChange={changeHandler} name='subject' value={formData.subject} type="text" placeholder='Subject' className='outline-none py-1'/>
             <hr />
            <textarea onChange={changeHandler} name='message'  value={formData.message} rows={'10'} cols={'30'} className='outline-none py-1'></textarea>
            <button className='bg-[#1B61D1] rounded-full px-5 py-1 w-fit text-white'>
                send
            </button>
        </form>
    </div>
  )
}

export default SendMail