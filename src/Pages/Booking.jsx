import React, { useState } from 'react'
import { turf } from '../data/data'
import BookinForm from '../Components/BookingForm'
function Booking({ bookedSlots, setBookedSlots, details, setDetails, handleChange, handleSubmit }) {

    const [display, setDisplay] = useState(false)
    const [selectedTurf, setSelectedTurf] = useState(null)


    const handleClick = (turf) => {
        setDisplay(true)
        setSelectedTurf(turf)
    }

    return (
        <>



            {
                display ? <BookinForm selectedTurf={selectedTurf} />
                    :
                    <div>
                        <div>
                            <p className='text-xl text-center mt-3 text-gray-600 font-bold'>Select Your Favorite Turf</p>
                        </div>
                        <div className='mt-10 p-5 flex flex-wrap justify-around items-center gap-10'>
                            {
                                turf.map((turf, index) => (
                                    <div className='bg-gray-300 max-w-[300px]  rounded-md shadow-md shadow-black/35   p-5 hover:scale-105 transition cursor-pointer' key={index}>
                                        <img src={turf.img} alt="" className='w-[300px] h-[200px] object-cover mb-5' />
                                        <h1 className='font-bold text-lg '> {turf.turfName}</h1>
                                        <h1 className='text-gray-700 font-semibold '>Location : {turf.location}</h1>
                                        <h1 className='text-gray-800 font-semibold'>Price per hr : <span className='font-bold'>{turf.price}</span></h1>
                                        <button className='mt-5 bg-green-400 py-2 px-2 rounded shadow-sm font-semibold hover:bg-green-500 hover:text-green-900 transition' onClick={() => handleClick(turf)}>Book Slot</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }

        </>
    )
}

export default Booking