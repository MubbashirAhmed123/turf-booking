import { Link, useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faBackward, faClose,  faHouse } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { motion } from "framer-motion"
function Navbar() {
  const[menu,SetMenu]=useState(false)
  const location=useLocation()
  const navigate=useNavigate()
  const cuurentPath=location.pathname
  
  const handleClick=()=>{
     navigate(-1)
  }

  const handleMenu=()=>{
  SetMenu(true)

  }

  return (
    <>
     <div className="sm:hidden ">
      <FontAwesomeIcon icon={faArrowRight}size="xl" className="m-3" onClick={handleMenu}/>
    </div>
   
   {menu &&
       <div className="flex sm:hidden ">
       <motion.ul className='flex flex-col justify-center items-center h-screen bg-gray-200  w-fit fixed z-50 p-5 ' initial={{x:-100,opacity:0,top:0}} animate={{x:0,opacity:1,top:0}}  >
        

        <Link className="mb-8" to='/' ><FontAwesomeIcon icon={faHouse} size="lg" /></Link>
        <Link className="mb-8 font-semibold" to='/booking'>Book Turf</Link>
        <Link className="mb-8 font-semibold" to='/booking_confirmation'  >Your booking</Link>
        <Link className="mb-8 font-semibold" to='/booked_slots'>See booked slots</Link>
        <FontAwesomeIcon icon={faClose} size="lg" className="absolute top-1 right-2" onClick={()=>SetMenu(false)}/>
        {cuurentPath==='/' ?'' : <li className="mb-5"> <FontAwesomeIcon icon={faBackward} className="cursor-pointer" onClick={()=>handleClick()} /></li>}
      </motion.ul>
      </div>

      }

    <div className='hidden sm:block container mx-auto sticky top-0 w-screen z-10 bg-green-200  shadow-md overflow-auto  '>
      <ul className='flex justify-center items-center  p-2 gap-10 sm:gap-16 lg:gap-24 overflow-x-auto '>
       {cuurentPath==='/' ?'' :  <FontAwesomeIcon icon={faBackward} className="cursor-pointer" onClick={()=>handleClick()} />}
        <Link to='/' ><FontAwesomeIcon icon={faHouse} size="lg" /></Link>
        <Link className=" font-bold" to='/booking'>Book Turf</Link>

        <Link to='/booking_confirmation' className="bg-green-300 px-2 py-2 rounded font-semibold hover:bg-green-400 transition">Your booking</Link>
        <Link to='/booked_slots' className="py-2 px-1 rounded bg-green-300 font-semibold hover:bg-green-500 transition">See Booked Slots</Link>
      </ul>
    </div>

 
    
    </>
    
  )
}

export default Navbar