import React, { useEffect, useState } from 'react'
import { turf } from '../data/data'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../store/turfSlice'
import { baseUrl } from '../baseUrl'


function Admin() {

    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({
        email: 'hrsportarena@gmail.com',
        turfName: '',
        password: 'HrSports@123'

    })

    const navigate = useNavigate()


    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const data = await res.json()
            if (res.status === 400) {
                toast.error(data.msg)
                return

            } else {
                dispatch(handleLogin())
                toast.success(data.msg)
            
                navigate(`/admin/dashboard/${data.name}`)
               
            }
        } catch (err) {
            toast.error('login failed!', err)
        }

    }



    return (
        <div className='flex justify-center mt-10 '>

            <form className='bg-green-200 p-2 rounded-md shadow-md max-w-96' onSubmit={handleSubmit}>
                <fieldset className='text-center text-gray-600'>login to see your turf information</fieldset>
                <div className='m-5'>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input type="email" name="email" id="email" className='outline-none rounded p-1 bg-gray-100 hover:bg-white  focus:ring transition' value={loginData.email} onChange={handleChange} required />
                </div>
                <div className='m-5'>
                    <select name="turfName" id="" className='p-2 rounded-md' onChange={handleChange}  >

                        <option value="select turf" name='turfName' selected disabled  >Select Turf</option>

                        {turf.map((turf, index) => <option key={index} value={turf.turfName} >{turf.turfName}</option>)}
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
    )
}

export default Admin