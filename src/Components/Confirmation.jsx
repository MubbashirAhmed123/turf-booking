import React from 'react'
import { motion } from 'framer-motion'
function Confirmation({handleLogOut,setConfirmLogout}) {
  return (
    <motion.div initial={{y:-100}} animate={{y:0,top:0,position:'fixed',zIndex:10 }} exit={{y:-100}} className='w-fit h-fit bg-gray-100 p-5 rounded inset-0 mx-auto sm:w-[350px] shadow shadow-black '>
        <p className='text-center'>Are you you want to logout?</p>
        <div className='flex justify-around mt-5'>
            <button className='px-3 py-1 rounded bg-green-400 hover:bg-green-500 hover:text-white transition' onClick={handleLogOut}>YES</button>
            <button className='px-3 py-1 rounded bg-red-400 hover:bg-red-500 hover:text-white transition' onClick={()=>setConfirmLogout(false)}>NO</button>
        </div>
    </motion.div>
  )
}

export default Confirmation