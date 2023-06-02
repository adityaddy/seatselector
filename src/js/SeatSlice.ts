import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export interface Seat {
  seatId: number,
  isSeatAvailable: boolean
}

interface SeatState {
  seatData: Array<Seat>,
  loading: 'loading' | 'succeeded' | 'failed'
}


export const updateSeatStatus = createAsyncThunk(
  'updateSeatStatus',
  (data: Array<Seat>) => {
    return data
  }
)

const initialState = {
  seatData: [
    {
      seatId: 1,
      isSeatAvailable: false
    },
    {
      seatId: 2,
      isSeatAvailable: false
    },
    {
      seatId: 3,
      isSeatAvailable: false
    },
    {
      seatId: 4,
      isSeatAvailable: false
    },
    {
      seatId: 5,
      isSeatAvailable: false
    },
    {
      seatId: 6,
      isSeatAvailable: false
    },
    {
      seatId: 7,
      isSeatAvailable: false
    },
    {
      seatId: 8,
      isSeatAvailable: false
    },
    {
      seatId: 9,
      isSeatAvailable: false
    },
    {
      seatId: 10,
      isSeatAvailable: false
    },
  ],
  loading: 'loading',
} as SeatState

// Then, handle actions in your reducers:
export const seatsSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateSeatStatus.pending, (state) => {
      state.loading = 'loading'
    })
    builder.addCase(updateSeatStatus.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.seatData = action.payload
    })
    builder.addCase(updateSeatStatus.rejected, (state, action) => {
      state.loading = 'failed'
    })
  },
})