import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { baseUrl } from "../baseUrl";

const initialState = {
  allSlots: [],

}



const turfSlice = createSlice({
  name: 'turf',
  initialState,
  reducers: {



    setSlots(state, action) {

      state.allSlots = action.payload

    },


    bookSlot(state, action) {

      const { turfName } = action.payload
      console.log(action.payload)

      const turfList = [
        "H R Sports Arena",
        "Orbit Play Arena",
        "Patel Sports Hub",
        "Battle Ground Sports Arena",
        "KBN Turf",
      ];

      if (turfList.includes(turfName)) {
        addToSlot(state, action);
      } else {
        console.log("no turf");
      }

    

    },

    removeSlot(state, action) {
      console.log(action.payload)
      removeSlotFromDb({ _id: action.payload })

    },



  },


})

const addToSlot = (state, action) => {

  const {from, to, turfName } = action.payload

  const isSlotAvailable = state.allSlots.some(slot => {
    const sameTurf = turfName === slot.turfName;

    const slotFrom = new Date(slot.from);
    const slotTo = new Date(slot.to);
    const newFrom = new Date(from);
    const newTo = new Date(to);

    // Check for partial overlap
    const partialOverlap = (newFrom < slotTo) && (newTo > slotFrom);

    // Check if the new slot is entirely within the existing slot
    const completeOverlap = (newFrom >= slotFrom) && (newTo <= slotTo);

    // Return true if it's the same turf and there's any kind of overlap
    return sameTurf && (partialOverlap || completeOverlap);
  });


  // const isSlotAvailable = state.allSlots.some(slot => {

  //   const sameTurf = turfName === slot.turfName

  //   const overlap = (new Date(from)<new Date(slot.to)) && (new Date(to)>new Date(slot.from))

  //   return sameTurf && overlap
  // })

  // console.log(isSlotAvailable)
  if (!isSlotAvailable) {

    sendToDb(action.payload)
    // toast.success('Your Slot Has Been Booked Successfully!')

  } else {
    toast.info('Already That Time Slots Is Booked.')

  }


}



export const { bookSlot, removeSlot, setSlots,handleLogin } = turfSlice.actions
export default turfSlice.reducer

export const fetchdata = () => async (dispatch) => {
  try {
    const res = await fetch(`${baseUrl}/allSlots`)
    const data = await res.json()

    dispatch(setSlots(data))
  } catch (error) {

  }
}


const sendToDb = async (data) => {
  try {
    const response = await fetch(`${baseUrl}/add`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json()
    console.log(result)
    if(response.status===200){
      toast.success(result.msg)

    }else{
      toast.error(result.msg)
    }

  } catch (error) {
    console.log(error)
  }


}



const removeSlotFromDb = async (id) => {
  console.log(id)
  try {

    const response = await fetch(`${baseUrl}/deleteLast`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(id)
    });

    const result = await response.json()
    if(response.status===200){
      toast.success(result.msg)

    }else{
      toast.error(result.msg)
    }
    // toast.success('Your Booking Has Been Cancelled')


  } catch (error) {
    console.log(error)
  }

}




