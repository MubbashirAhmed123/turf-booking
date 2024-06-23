import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchdata, removeSlot } from '../store/turfSlice'
import { toast } from 'react-toastify'
function Dashboard() {

  const { name } = useParams()
  const { allSlots } = useSelector(state => state.turf)
  const dispatch = useDispatch()
  const navigate=useNavigate()


  console.log(allSlots)

  const turfs = allSlots.filter((turf) => {
    return turf.turfName === name
  })
  console.log(turfs)

  const handleClick = (id) => {

    const res=window.confirm('Are you sure you want to delete this booking?')
    if(res){
      dispatch(removeSlot(id))

      
    }

    dispatch(fetchdata())
  }

  const handleLogOut=()=>{
   
    // toast.info('logout successfully!')
    // navigate('/admin/login')
  }


  useEffect(() => {
    console.log('mount')
    dispatch(fetchdata())
    
// eslint-disable-next-line
  }, [])




  return (
    <>
      <div>
        <h1 className='text-xl font-bold text-gray-600 mt-5 text-center sm:text-2xl md:text-3xl'>Dashboard of <span className='font-extrabold text-gray-700'> {name}</span></h1>

        {
          turfs.length > 0 ? turfs.map((t, i) => (
            <ul className='mt-5 p-2' key={i}>
              <li className='hidden'>id: {t._id}</li>
              <li>Name: <span className='font-bold text-gray-800'>{t.name}</span></li>
              <li>Phone Number: <span className='font-bold text-gray-800'>{t.phone_number}</span></li>
              <li>From : <span className='font-bold text-gray-800'>{t.from}</span></li>
              <li>To : <span className='font-bold text-gray-800'>{t.to}</span></li>
              <li>Total Price: <span className='font-bold text-gray-800'>{t.totalPrice}</span></li>
              <button className='mt-3 py-2 px-3 rounded bg-red-300' onClick={() => handleClick(t._id)}>Delete Booking</button>
              <hr className='mt-3 ' />
            </ul>
          )) : <div className='bg-red-300 p-2 text-center text-red-700 font-bold'> No Booking Yet!</div>
        }

        <div className='fixed right-36 mt-5  '>
          <button className='p-2 bg-red-400 text-white font-semibold rounded hover:bg-red-500/70' onClick={handleLogOut}>Log Out</button>
        </div>
      </div>

     
    </>
  )
}

export default Dashboard