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
      mode:'cors'
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

export const login = createAsyncThunk("admin/login", async (loginData, { rejectWithValue }) => {
  const { email, turfName, password } = loginData;

  if (!(email && password && turfName)) {
      toast.error('All fields are required.');
      return rejectWithValue('All fields are required.');
  }

  try {
      const res = await fetch(`${baseUrl}/login`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
      });

      if (!res.ok) {
          const data = await res.json();
          toast.error(data.msg);
          return rejectWithValue(data.msg);
      }

      const data = await res.json();
      toast.success(data.msg);
      return data;
  } catch (err) {
      toast.error('Login failed!', err.message);
      return rejectWithValue(err.message);
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
      mode:'cors',
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
      mode:'cors',

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
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.name = action.payload.name;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('name', action.payload.name);
    })
    .addCase(login.rejected, (state, action) => {
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


export const isAuthenticated = createAsyncThunk("auth/isAuthenticated", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${baseUrl}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.msg);
      throw new Error(data.msg);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export default turfSlice.reducer;
