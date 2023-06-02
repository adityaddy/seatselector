import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFirestore, doc, runTransaction} from "firebase/firestore"; 

interface BookedSeatState {
  bookedSeat: Array<number>,
  status: 'idle' | 'booking' | 'booked' | 'failed'
}


export const bookSeat = createAsyncThunk(
  'bookSeat',
  async (data: number) => {
    try {
      // run transaction to handle race condition
      await runTransaction(getFirestore(), async (transaction) => {
        const docRef = doc(getFirestore(), `seats/${data}`);
        const docSnapshot = await transaction.get(docRef);
        if (docSnapshot.exists()) {
          const docData = docSnapshot.data();
          if(docData && !docData.isOccupied) {
            transaction.update(docRef, {
              isOccupied: true
            });
          } else {
            throw new Error("Seat not available");
          }
        } else {
          throw new Error("Seat not found");
        }
      });
      return data;
    } catch (e) {
      throw e;
    }
  }
)

const initialState = {
  bookedSeat: JSON.parse(localStorage.getItem("bookedSeat") || "[]"),
  status: 'idle',
} as BookedSeatState

// Then, handle actions in your reducers:
export const bookedSeatSlice = createSlice({
  name: 'bookedSeats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bookSeat.pending, (state) => {
      state.status = 'booking'
    })
    builder.addCase(bookSeat.fulfilled, (state, action) => {
      state.status = 'booked'
      state.bookedSeat = [...state.bookedSeat, action.payload]
      localStorage.setItem("bookedSeat", JSON.stringify(state.bookedSeat));
    })
    builder.addCase(bookSeat.rejected, (state, action) => {
      state.status = 'failed'
    })
  },
})