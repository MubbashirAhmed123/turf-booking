import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { baseUrl } from "../baseUrl";

// Initial state
const initialState = {
  allSlots: [],
  loading: false,
  error: null,
};

// Async thunk for fetching data
export const fetchSlots = createAsyncThunk("turf/fetchSlots", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${baseUrl}/allSlots`,{
      mode:'no-cors'
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch slots");
    }
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk for booking a slot
export const bookSlot = createAsyncThunk("turf/bookSlot", async (slotData, { getState, rejectWithValue }) => {
  const state = getState().turf;

  const { from, to, turfName } = slotData;
  const isSlotAvailable = state.allSlots.some((slot) => {
    const sameTurf = turfName === slot.turfName;

    const slotFrom = new Date(slot.from);
    const slotTo = new Date(slot.to);
    const newFrom = new Date(from);
    const newTo = new Date(to);

    const partialOverlap = newFrom < slotTo && newTo > slotFrom;
    const completeOverlap = newFrom >= slotFrom && newTo <= slotTo;

    return sameTurf && (partialOverlap || completeOverlap);
  });

  if (isSlotAvailable) {
    toast.info("Already That Time Slots Is Booked.");
    return rejectWithValue("Slot already booked");
  }

  try {
    const response = await fetch(`${baseUrl}/add`, {
      mode:'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slotData),
    });

    const result = await response.json();
    if (response.status === 200) {
      toast.success(result.msg);
      return slotData;
    } else {
      toast.error(result.msg);
      throw new Error(result.msg);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk for removing a slot
export const removeSlot = createAsyncThunk("turf/removeSlot", async (slotId, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/deleteLast`, {
      mode:'no-cors',

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: slotId }),
    });

    const result = await response.json();
    if (response.status === 200) {
      toast.success(result.msg);
      return slotId;
    } else {
      toast.error(result.msg);
      throw new Error(result.msg);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice
const turfSlice = createSlice({
  name: "turf",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.allSlots = action.payload;
      })
      .addCase(fetchSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bookSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.allSlots.push(action.payload);
      })
      .addCase(bookSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.allSlots = state.allSlots.filter((slot) => slot._id !== action.payload);
      })
      .addCase(removeSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default turfSlice.reducer;
