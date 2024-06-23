import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bookSlot } from '../store/turfSlice'
import { motion } from 'framer-motion'

function BookingForm({ selectedTurf }) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [details, setDetails] = useState({
    name: '',
    phone_number:'',
    price: selectedTurf.price,
    turfName: selectedTurf.turfName,
    from: '',
    to: '',
  })


  const handleChange = (e) => {
    const { name, value } = e.target
    setDetails({ ...details, [name]: value })
  }

  const timeDiff=Math.ceil((new Date(details.to)) - new Date(details.from))/(1000 * 60 *60)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
   dispatch(bookSlot({ ...details, totalPrice: details.price * timeDiff.toFixed(2) }))

    navigate('/')
  }

  return (
    <>
      <div className='mt-10'>
        <p className='text-red-400 p-2 text-center font-semibold'><span className='text-red-400 font-bold text-lg'>Note: </span> Make sure to  select correct date and time 1-11 AM | 12-23 PM.
        <br />
        Time is based on <span className='font-bold'>24hrs</span></p>

        <motion.form className="max-w-md mx-auto p-5" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>


          <p className='mt-3 mb-5 text-lg font-semibold text-gray-500'>Booking slot in <span className='font-bold text-gray-600'>{selectedTurf.turfName}</span>

          </p>
          <Link to='/booked_slots' className=' py-3 px-3  bg-blue-400 rounded-md sm:hidden'>See Booked Slots</Link>


          <div className="mt-5 relative z-0 w-full mb-5 group sm:mt-0">
            <label htmlFor="turfName" className="text-gray-700 font-bold">Turf Name</label>

            <input type="text" name="turfName" id="turfName" className="block py-1 px-0 w-full text-sm text-black font-bold  bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600  focus:outline-none  cursor-not-allowed" placeholder=" " value={selectedTurf.turfName} readOnly />
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="price" className="text-gray-700 font-bold">Price per hr</label>

            <input type="number" name="price" id="price" className="block py-1 px-0 w-full text-sm text-black font-bold  bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600  focus:outline-none  cursor-not-allowed" placeholder=" " value={selectedTurf.price} readOnly />
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="name" className="text-gray-700 font-bold">Name</label>

            <input type="text" maxLength={10} name="name" id="name" className="block py-1 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={details.name} onChange={handleChange} />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="phone_number" className="text-gray-700 font-bold">Phone Number</label>

            <input type="number" maxLength={10} name="phone_number" id="phone_number" className="block py-1 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-700 peer" placeholder=" " required value={details.phone_number} onChange={handleChange} />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="from" className="text-gray-700 font-bold">From</label>

            <input type="datetime-local" name="from" id="from" className="block py-1 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-700 peer" placeholder=" " required value={details.time} onChange={handleChange} />
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="to" className="text-gray-700 font-bold">To</label>

            <input type="datetime-local" name="to" id="to" className="block py-1 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-700 peer" placeholder=" " required value={details.time} onChange={handleChange} />
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Book Slot</button>

        </motion.form>
      </div>

    </>
  )
}

export default BookingForm