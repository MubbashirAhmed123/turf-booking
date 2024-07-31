import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeSlot } from '../store/turfSlice'
import { toast } from 'react-toastify'
import useAuth from '../utils/useAuth'
import Confirmation from '../Components/Confirmation'
import Pagination from '../Components/Pagination'

function Dashboard() {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const { allSlots } = useSelector(state => state.turf);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[currentPage,setCurrentPage]=useState(1)
  const name = localStorage.getItem('name');

  const turfs = allSlots.filter(turf => turf.turfName === name);


  const handleClick = id => {
    const res = window.confirm('Are you sure you want to cancel this booking?');
    if (res) {
      try {
        dispatch(removeSlot(id));
      } catch (error) {
        toast.error('Error cancelling booking');
      }
    }
  };

  const handleLogOut = () => {
    toast.success('Logout successfully');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/admin/login');
  };

  const slotePerPage = 5

  const StartIndex = (currentPage - 1) * slotePerPage
  const endIndex = StartIndex + slotePerPage

  const totalPage = Math.ceil(turfs.length / slotePerPage)
  const currentSlots = turfs.slice(StartIndex, endIndex)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useAuth()

  return (
    <>
      {confirmLogout && <Confirmation handleLogOut={handleLogOut} setConfirmLogout={setConfirmLogout} />}
      <div>
        <header className='flex justify-around items-center mb-10 mt-5'>
          <h1 className='text-xl font-bold text-gray-600 mt-5 text-center sm:text-2xl md:text-3xl'>
            Dashboard of <span className='font-extrabold text-gray-700'>{name}</span>
          </h1>
          <div>
            <button className='p-2 bg-red-400 text-red-700 font-semibold rounded hover:bg-red-500 hover:text-red-800' onClick={() => setConfirmLogout(true)}>Log Out</button>
          </div>
        </header>

        {turfs.length > 0 ? currentSlots.map((t, i) => (
          <ul className='mt-5 p-5' key={i}>
            <li className='hidden'>id: {t._id}</li>
            <li>Name: <span className='font-bold text-gray-800'>{t.name}</span></li>
            <li>Phone Number: <span className='font-bold text-gray-800'>{t.phone_number}</span></li>
            <li>From: <span className='font-bold text-gray-800'>{t.from}</span></li>
            <li>To: <span className='font-bold text-gray-800'>{t.to}</span></li>
            <li>Total Price: <span className='font-bold text-gray-800'>{t.totalPrice}</span></li>
            <button className='mt-3 py-2 px-3 text-red-700 font-semibold rounded bg-red-300 hover:bg-red-400 hover:text-red-800' onClick={() => handleClick(t._id)}>Delete Booking</button>
            <hr className='mt-3' />
          </ul>
        )) : <div className='bg-red-300 p-2 text-center text-red-700 font-bold'> No Booking Yet!</div>}
      </div>
      {totalPage>1 && <Pagination handlePageChange={handlePageChange} currentPage={currentPage} totalPage={totalPage}/>}
    </>
  );
}

export default Dashboard;

