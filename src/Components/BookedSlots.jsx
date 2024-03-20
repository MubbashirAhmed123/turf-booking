import { useEffect } from "react"
import {  useDispatch, useSelector } from "react-redux"
import { fetchdata } from "../store/turfSlice"
function BookedSlots() {

  const { allSlots } = useSelector(state => state.turf)
  console.log('allSlots',allSlots)


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchdata())

    
  }, [dispatch])
  return (
    <>
    <div className='p-2 ' >
        {
            allSlots?.length>0 ? allSlots.map((ele,index)=>(
                <ul key={index} className="p-2">
                  <li>Tur Name: {ele.turfName}</li>
                    <li>Date: {ele.date}</li>
                    <li>From: {ele.from}</li>
                    <li>To: {ele.to}</li>
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