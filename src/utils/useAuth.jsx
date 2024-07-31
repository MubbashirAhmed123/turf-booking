import React, { useEffect, useState } from 'react'
import { baseUrl } from '../baseUrl'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function useAuth() {


    const[isAuth,setIsAuth]=useState(false)
    const navigate=useNavigate()


    useEffect(()=>{

        const isAuthenticated=async()=>{
            const token=localStorage.getItem('token')

            const res=await fetch(`${baseUrl}/dashboard`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
                
            })

            const data=await res.json()
            if(!res.ok){
              toast.error(data.msg)

              navigate('/admin/login')
              setIsAuth(false)
              return
            }
            setIsAuth(true)
        }
        isAuthenticated()
    },[])
    return isAuth

}

export default useAuth