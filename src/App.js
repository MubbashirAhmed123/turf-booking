import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Booking from "./Pages/Booking";
import { useEffect } from "react";
import BookedSlots from "./Components/BookedSlots";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BookingConfirm from "./Components/BookingConfirm";
import { useDispatch } from "react-redux";
import { fetchdata } from "./store/turfSlice";


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchdata())
  }, [dispatch])

  return (
    <div className="App ">
      <ToastContainer />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booked_slots" element={<BookedSlots />} />
        <Route path="/booking_confirmation" element={<BookingConfirm />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
