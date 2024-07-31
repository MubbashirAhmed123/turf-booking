import React, { useState } from 'react';
import { turf } from '../data/data';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import { useDispatch } from 'react-redux';
import { login } from '../store/turfSlice';

function Admin() {
    const [loginData, setLoginData] = useState({
        email: '',
        turfName: '',
        password: ''
    });
     
    const dispatch=useDispatch()
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(login(loginData));

        if (result.meta.requestStatus === 'fulfilled') {
            navigate(`/admin/dashboard/${result.payload.name}`);
        }
    };

    return (
        <div className='flex justify-center mt-10 '>
            <form className='bg-green-200 p-2 rounded-md shadow-md max-w-96' onSubmit={handleSubmit}>
                <fieldset className='text-center text-gray-600'>Login To See Your Turf Booking</fieldset>
                <div className='m-5'>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input type="email" name="email" id="email" className='outline-none rounded p-1 bg-gray-100 hover:bg-white  focus:ring transition' value={loginData.email} onChange={handleChange} required />
                </div>
                <div className='m-5'>
                    <select name="turfName" id="turfName" className='p-2 rounded-md' onChange={handleChange} required>
                        <option value="" disabled selected>Select Turf</option>
                        {turf.map((turf, index) => (
                            <option key={index} value={turf.turfName}>{turf.turfName}</option>
                        ))}
                    </select>
                </div>
                <div className='m-5'>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input type="password" name="password" id="password" className='outline-none rounded p-1 bg-gray-100 hover:bg-white  focus:ring transition' value={loginData.password} onChange={handleChange} required />
                </div>
                <div className='m-5'>
                    <button className='bg-green-300 py-2 px-3 rounded text-green-800 font-semibold hover:bg-green-400 focus:ring transition'>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Admin;
