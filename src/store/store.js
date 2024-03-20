import { configureStore } from "@reduxjs/toolkit";
import turfSlice from "./turfSlice";



const store=configureStore({
reducer:{
    turf:turfSlice,
    
},
})
export default store