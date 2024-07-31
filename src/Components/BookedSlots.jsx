import {  useState } from "react"
import {  useSelector } from "react-redux"
import Pagination from "./Pagination"

function BookedSlots() {

  const { allSlots } = useSelector(state => state.turf)

  const [selectedValue, setSelectedValue] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const turfname = [...new Set(allSlots.map(turf => turf.turfName))]

  const filteredTufs = selectedValue !== 'all' ? allSlots.filter((turf) => turf.turfName === selectedValue) : allSlots

  const slotePerPage = 5

  const StartIndex = (currentPage - 1) * slotePerPage
  const endIndex = StartIndex + slotePerPage

  const totalPage = Math.ceil(filteredTufs.length / slotePerPage)
  const currentSlots = filteredTufs.slice(StartIndex, endIndex)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      {allSlots?.length > 0 && (
        <form className="p-2">
          <select
            name=""
            id=""
            className="p-2 rounded-md font-semibold bg-gray-200 outline-none focus:ring transition cursor-pointer"
            onChange={(e) => {
              setSelectedValue(e.target.value)
              setCurrentPage(1) // Reset to the first page when filtering
            }}
          >
            <option value="all" selected>All</option>
            {turfname.map(ele => <option value={ele} key={ele}>{ele}</option>)}
          </select>
        </form>
      )}

      <div className='p-2'>
        {currentSlots.length > 0 ? currentSlots.map((ele, index) => (
          <ul key={index} className="p-2">
            <li>Tur Name: {ele.turfName}</li>
            <li>From: {ele.from.split('T')[1] >= '12:00' ? ele.from + ' PM' : ele.from + ' AM'}</li>
            <li>To: {ele.to.split('T')[1] >= '12:00' ? ele.to + ' PM' : ele.to + ' AM'}</li>
            <hr className='bg-gray-900 text-gray-800 h-[2px] mt-3' />
          </ul>
        )) : (
          <div className='mt-5 bg-red-300 p-2 font-semibold text-center'>No Slots Are Booked</div>
        )}
      </div>

      {totalPage > 1 && <Pagination handlePageChange={handlePageChange} currentPage={currentPage} totalPage={totalPage}/>}
    </>
  )
}

export default BookedSlots
