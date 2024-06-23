import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchdata, removeSlot } from "../store/turfSlice"
import { baseUrl } from "../baseUrl"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {motion} from "framer-motion"
function BookingConfirm() {

  const navigate=useNavigate()
  const dispatch = useDispatch()


  const { allSlots } = useSelector(state => state.turf)
  const len = allSlots.length


  const [display, setDisplay] = useState(false)
  const [phone_number,setPhone_Number]=useState(null)
  const[singleSlot,setSingleSlot]=useState()

  const handleClick = () => {
    dispatch(removeSlot(allSlots[len-1]._id))
    navigate('/')

  }

  const handleSearch=async(e)=>{

    e.preventDefault()
    setPhone_Number('')

  
  try {

    const response = await fetch(`${baseUrl}/findOne`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({phone_number})
    });

    const result = await response.json()
    setSingleSlot(result.data)

    if(result.msg){
      toast.success(result.msg)
    
    }else{
      toast.error(result.errmsg)
    }
 

  } catch (error) {
    toast.error(error)
  }

  }

 
  useEffect(() => {
  
  dispatch(fetchdata())

  }, [dispatch])

 
  return (
    <>
      <div className="container mx-auto flex justify-center ">

        {!singleSlot && <form  onSubmit={handleSearch} className="p-5  mt-5">
          <fieldset className="font-bold mb-5">To See Your Booking Enter Phone Number!</fieldset>
          <div>
            <label htmlFor="phone_number" className="font-semibold">Phone Number</label>
            <br />
            <input  type="number"  name="phone_number" id="phone_number" value={phone_number} maxLength={10} onChange={(e)=> e.target.value.length>10?alert('Phone number must be in 10 digits') : setPhone_Number(e.target.value)} required="required" className="p-1 mt-2 rounded outline-none border border-black" placeholder="Enter Phone number"/>
          </div>
          <div className="mt-5">
            <button className="bg-green-400 p-2 rounded font-semibold hover:bg-green-500 transition">See Booking</button>
          </div>
        </form>}

        {
          singleSlot? 
          <div  className="mt-10 bg-gray-300 p-5 rounded shadow-md w-[350px]  text-gray-700 text-lg font-semibold ">
            <h1 className="mb-3 ">Turf Name : <span className="font-bold text-gray-800 mx-5"> {singleSlot.turfName}</span></h1>
            <h1 className="mb-3">Price per hr : <span className="font-bold text-gray-800 mx-5">{singleSlot.price}</span></h1>
            <h1 className="mb-3">User name :  <span className="font-bold text-gray-800 mx-5">{singleSlot.name}</span></h1>
            <h1 className="mb-3">User Ph Number :  <span className="font-bold text-gray-800 mx-5">{singleSlot.phone_number}</span></h1>
            <h1 className="mb-3">From : <span className="font-bold text-gray-800 mx-5">{allSlots[len-1].from && singleSlot.from.split('T')[1] >= '12:00' ? allSlots[len-1].from +' PM' : singleSlot.from+'AM'}</span></h1>
              <h1 className="mb-3">To : <span className="font-bold text-gray-800 mx-5">{allSlots[len-1].to && singleSlot.to.split('T')[1] >= '12:00' ? allSlots[len-1].to +' PM' : singleSlot.to+' AM'}</span></h1>
              <h1 className="mb-3">Total Price To Pay : <span className="font-bold text-gray-800 mx-5">{singleSlot.totalPrice}</span></h1>


          </div>:''
        }
        


      </div>

      {singleSlot && <div className="mt-5 flex justify-center ">
       
        <button className="bg-red-300 p-2 rounded text-red-800 font-semibold hover:bg-red-400 transition focus:ring ring-red-300" onClick={() => setDisplay(true)
        }>Cancel Booking</button>
      </div>
     }

      {display && <motion.div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-10 w-full h-[100px] bg-red-200 p-2 rounded transition delay-700 bg-opacity-100 sm:w-[60%] lg:w-[40%]" initial={{top:-100,opacity:0}} animate={{top:50,opacity:1}}  >
        <p className="font-bold">Are you sure you want to cancel the booking?</p>
        <div className="flex justify-center gap-20 p-2 mt-3">
          <button className="bg-red-300 py-2 px-5 rounded hover:bg-red-400 transition" onClick={handleClick} >Yes</button>
          <button className="bg-green-300 py-2 px-5 rounded hover:bg-green-400 transition" onClick={() => setDisplay(false)}>No</button>
        </div>
      </motion.div>}

    </>
  )
}

export default BookingConfirm