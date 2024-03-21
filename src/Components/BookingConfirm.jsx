import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchdata, removeSlot } from "../store/turfSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {motion} from "framer-motion"
function BookingConfirm() {

  const navigate=useNavigate()

  const { allSlots } = useSelector(state => state.turf)
  const len = allSlots.length



  const [display, setDisplay] = useState(false)

  const handleClick = () => {
    dispatch(removeSlot(allSlots[len-1]._id))
    toast.success('Your Booking Has Been Cancelled')
    navigate('/')

  }

 
  const dispatch = useDispatch()
  useEffect(() => {
  dispatch(fetchdata())

  }, [dispatch])

 
  return (
    <>
      <div className="container mx-auto flex justify-center ">
        {
          [allSlots[len-1]] ? [allSlots[len-1]].map((ele, index) => (
            <div key={index} className="mt-10 bg-gray-300 p-5 rounded shadow-md w-[350px]  text-gray-700 text-lg font-semibold ">
              
              <h1 className="mb-3 ">Turf Name : <span className="font-bold text-gray-800 mx-5"> {ele?.turfName}</span></h1>
              <h1 className="mb-3">Price per hr : <span className="font-bold text-gray-800 mx-5">{ele?.price}</span></h1>
              <h1 className="mb-3">User name :  <span className="font-bold text-gray-800 mx-5">{ele?.name}</span></h1>
              <h1 className="mb-3">From : <span className="font-bold text-gray-800 mx-5">{ele?.from && ele?.from.split('T')[1] > '12:00' ? ele?.from +' PM' : ele?.from+'AM'}</span></h1>
              <h1 className="mb-3">To : <span className="font-bold text-gray-800 mx-5">{ele?.to && ele?.to.split('T')[1] > '12:00' ? ele?.to +' PM' : ele?.to+' AM'}</span></h1>
              <h1 className="mb-3">Total Price To Pay : <span className="font-bold text-gray-800 mx-5">{ele?.totalPrice}</span></h1>

            </div>
          )) : <div className="mt-5 bg-red-300 rounded p-2 w-full text-center font-bold">No Booking Yet</div>
        }


      </div>

      {allSlots.length>0 && <div className="mt-5 flex justify-center ">
       
        <button className="bg-red-300 p-2 rounded text-red-800 font-semibold hover:bg-red-400 transition focus:ring ring-red-300" onClick={() => setDisplay(true)
        }>Cancel Booking</button>
      </div>
     }

      {display && <motion.div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-10 w-full h-[100px] bg-red-200 p-2 rounded transition delay-700 bg-opacity-100 sm:w-[60%] lg:w-[40%]" initial={{top:-100,opacity:0}} animate={{top:50,opacity:1}}  >
        <p className="font-bold">Are you want to sure you want to cancel the booking</p>
        <div className="flex justify-center gap-20 p-2 mt-3">
          <button className="bg-red-300 py-2 px-5 rounded hover:bg-red-400 transition" onClick={handleClick} >Yes</button>
          <button className="bg-green-300 py-2 px-5 rounded hover:bg-green-400 transition" onClick={() => setDisplay(false)}>No</button>
        </div>
      </motion.div>}

    </>
  )
}

export default BookingConfirm