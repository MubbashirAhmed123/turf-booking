import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { baseUrl } from "../baseUrl";

const initialState = {
  allSlots: [],
  hrSport: [],
  turf2: [],

}



const turfSlice = createSlice({
  name: 'turf',
  initialState,
  reducers: {

    setSlots(state, action) {

      state.allSlots = action.payload

    },


    bookSlot(state, action) {
      console.log(state.allSlots)

      const { turfName } = action.payload
      console.log(action.payload)

      if (turfName === 'H R Sports Arena') {
        addToSlot(state, action, state.hrSport)

      }
      else if (turfName === 'Orbit Play Arena') {
        addToSlot(state, action, state.turf2)

      }
      else if (turfName === 'Patel Sports Hub') {
        addToSlot(state, action, state.turf2)

      }
      else if (turfName === 'Battle Ground Sports Arena') {
        addToSlot(state, action, state.turf2)

      }
      else if (turfName === 'KBN Turf') {
        addToSlot(state, action, state.turf2)

      }
      else {
        console.log('no turf')
      }

    },

    removeSlot(state, action) {
      console.log(action.payload)
      removeSlotFromDb({ _id: action.payload })

    },

  },


})

const addToSlot = (state, action, turf) => {

  const { date, from, to, turfName } = action.payload

  const isSlotAvailable = state.allSlots.some(slot => {

    const newStart = new Date(date + 'T' + from)
    const newEnd = new Date(date + 'T' + to)
    const existingStart = new Date(slot.date + 'T' + slot.from)
    const existingEnd = new Date(slot.date + 'T' + slot.to)
    const sameTurf = turfName === slot.turfName

    const dateOverLap = newStart < existingEnd && newEnd > existingStart

    return sameTurf && dateOverLap
  })

  console.log(isSlotAvailable)
  if (!isSlotAvailable) {

    // turf.push({ ...action.payload })
    sendToDb(action.payload)
    toast.success('your slot have been booked successfully!')

  } else {
    toast.info('Already That Time Slots Is Booked.')

  }


}



export const { bookSlot, removeSlot, setSlots } = turfSlice.actions
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
    console.log(result)

   } catch (error) {
    console.log(error)
  }

}


