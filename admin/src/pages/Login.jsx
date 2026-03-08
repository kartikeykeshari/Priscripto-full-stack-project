import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets"
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';
const Login = () => {

    //creatin state for admin or Doctor Login
    const [state, setState] = useState('Admin');

    //email state for bodyData
    const [email, setEmail] = useState('');

    //password state for bodyData
    const [password, setPassword] = useState('');

    //taking setAtoken function to set the aToken state into Admincontext and backend Url for api call
    const { setAToken, backendUrl } = useContext(AdminContext);

    const { setDToken, dToken } = useContext(DoctorContext);

    //submit handler when doctor or admin submit the login form then this onSubmitHandler is called
    const onSubmitHandler = async (event) => {

        //event.preventDefault(); is used to prevent the default submit behaviour of a form
        event.preventDefault();

        //we use try/cath block to handle the errors
        console.log(state);

        try {

            //checking the state for Admin or Doctor
            if (state === 'Admin') {
                //login admin api request
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
                if (data.success === true) {
                    //stting the token into the local Storage
                    localStorage.setItem('aToken', data.token);
                    //setting the token in aToken State variable which stores in AdminContext
                    setAToken(data.token);
                    //toast for succussful login completion of admin
                    toast.success("Admin Logged in successfully!")
                } else {
                    toast.error(data.message);
                }
            } else {
                //doctor Login (if state is 'doctor)
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });
                if (data.success === true) {
                    //stting the token into the local Storage
                    localStorage.setItem('dToken', data.token);
                    //setting the token in aToken State variable which stores in AdminContext
                    setDToken(data.token);
                    //toast for succussful login completion of admin
                    toast.success("Dcotor Logged in successfully!")
                    console.log(data.token);

                } else {
                    toast.error(data.message);
                }
            }
        } catch (e) {
            //handling Error
            toast.error("Error occured in Login!");
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] ms:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>

                {
                    state === 'Admin'
                        ? <p>Doctor Login? <span className='cursor-pointer text-primary underline' onClick={() => setState('Doctor')}>Click here</span></p>
                        : <p>Admin Login? <span className='cursor-pointer text-primary underline' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login