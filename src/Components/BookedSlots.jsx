import { useEffect, useState } from "react"
import {  useDispatch, useSelector } from "react-redux"
import { fetchdata } from "../store/turfSlice"
function BookedSlots() {

  const { allSlots } = useSelector(state => state.turf)

  const[selectedValue,setSelectedValue]=useState('')

 const turfname=[...new Set(allSlots.map(turf => turf.turfName))]


const filteredTufs= selectedValue!=='all' ? allSlots.filter((turf)=> turf.turfName===selectedValue 
): allSlots


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchdata())

    
  }, [dispatch])
  return (
    <>
    <form className="p-2 ">
      <select name="" id="" className="p-2 rounded-md font-semibold bg-gray-200 outline-none focus:ring transition cursor-pointer" onChange={(e)=> setSelectedValue(e.target.value)}>
        <option value="all" selected >All</option>
        {turfname.map(ele=> <option value={ele}>{ele}</option> )}
       
      </select>
    </form>


    <div className='p-2 ' >
        {
            allSlots?.length>0 ? filteredTufs.map((ele,index)=>(
                <ul key={index} className="p-2">
                  <li>Tur Name: {ele.turfName}</li>
                    <li>From: {ele.from.split('T')[1]>'12:00' ? ele.from+' PM' :ele.from+' AM'}</li>
                    <li>To: {ele.to.split('T')[1]>'12:00' ? ele.to+' PM' :ele.to+' AM'}</li>
                    <hr className='bg-gray-900 text-gray-800 h-[2px] mt-3' />
                </ul>
            )):
            <div className='mt-5 bg-red-300 p-2  font-semibold text-center'> No Slots Are Booked</div>
        }
    </div>


    
    </>
  )
}

export default BookedSlots