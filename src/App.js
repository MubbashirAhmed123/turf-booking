import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Booking from "./Pages/Booking";
import BookedSlots from "./Components/BookedSlots";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BookingConfirm from "./Components/BookingConfirm";

import Admin from "./Pages/Admin";
import Dashboard from "./Pages/Dashboard";
import { useState } from "react";
import NotFound from "./Pages/NotFound";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  return (
    <div className="App ">
      <ToastContainer />

      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booked_slots" element={<BookedSlots />} />
        <Route path="/booking_confirmation" element={<BookingConfirm />} />

        <Route path="/admin/login" element={<Admin setIsLoggedIn={setIsLoggedIn}/>}/>

        <Route path="/admin/dashboard/:name" element={isLoggedIn ? <Dashboard  setIsLoggedIn={setIsLoggedIn}/ >:<h1 className="text-center font-bold text-red-500 text-xl">Unauthorized. Please log in.</h1>}  /> 

        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
