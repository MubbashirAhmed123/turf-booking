import { Link, useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faBackward, faClose,  faHouse } from "@fortawesome/free-solid-svg-icons"
import {  useState } from "react"
import { motion } from "framer-motion"
function Navbar({isLoggedIn}) {
  
  const[menu,SetMenu]=useState(false)
  const name=localStorage.getItem('name')
  const location=useLocation()
  const navigate=useNavigate()
  const currentPath=location.pathname
  
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
      {isLoggedIn ? <Link to={`/admin/dashboard/${name}`} className="fixed top-2 right-5 px-2 py-2 rounded bg-green-400/70 text-green-700 font-bold hover:bg-green-400">dashboard</Link> :<Link to='/admin/login' className="fixed top-2 right-5 px-2 py-2 rounded bg-green-400/70 text-green-700 font-bold hover:bg-green-400">Admin</Link>}
    </div>
   
   {menu &&
       <div className="flex sm:hidden ">
       <motion.ul className='flex flex-col justify-center items-center h-screen bg-gray-200  w-fit fixed z-50 p-5 ' initial={{x:-100,opacity:0,top:0}} animate={{x:0,opacity:1,top:0}}  >
        
         
        <Link className="mb-8" to='/' ><FontAwesomeIcon icon={faHouse} size="lg" /></Link>
        <Link className="mb-8 font-semibold" to='/booking'>Book Turf</Link>
        <Link className="mb-8 font-semibold" to='/booking_confirmation'  >Your booking</Link>
        <Link className="mb-8 font-semibold" to='/booked_slots'>See booked slots</Link>
        <FontAwesomeIcon icon={faClose} size="lg" className="absolute top-1 right-2" onClick={()=>SetMenu(false)}/>
        {currentPath==='/' ?'' : <li className="mb-5"> <FontAwesomeIcon icon={faBackward} className="cursor-pointer" onClick={()=>handleClick()} /></li>}
      </motion.ul>
      </div>

      }

    <div className='hidden sm:block container mx-auto sticky top-0 w-screen z-10 bg-green-200  shadow-md overflow-auto  '>
      <ul className='flex justify-center items-center  p-2  sm:gap-10 md:gap-16 lg:gap-24 overflow-x-auto '>
       {currentPath==='/' ?'' :  <FontAwesomeIcon icon={faBackward} className="cursor-pointer" onClick={()=>handleClick()} />}
        <Link to='/' ><FontAwesomeIcon icon={faHouse} size="lg" /></Link>
        <Link className="py-2 px-2 rounded bg-green-300 font-semibold hover:bg-green-500 transition" to='/booking'>Book Turf</Link>

        <Link to='/booking_confirmation' className="bg-green-300 px-2 py-2 rounded font-semibold hover:bg-green-400 transition">Your booking</Link>
        <Link to='/booked_slots' className="py-2 px-1 rounded bg-green-300 font-semibold hover:bg-green-500 transition">See Booked Slots</Link>
         {isLoggedIn ? <Link to={`/admin/dashboard/${name}`} className="py-2 px-2 bg-green-500/80 font-semibold rounded  hover:bg-green-500 transition ">Dashboard</Link> :<Link to='/admin/login' className="py-2 px-2 bg-green-500/80 font-semibold rounded  hover:bg-green-500 transition ">Admin</Link>}
      </ul>
    </div>

 
    
    </>
    
  )
}

export default Navbar