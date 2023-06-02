// recommended way https://redux.js.org/introduction/why-rtk-is-redux-today
import { configureStore } from '@reduxjs/toolkit'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { seatsSlice } from './SeatSlice';
import { bookedSeatSlice } from './BookedSeatSlice';

const firebaseConfig = {
  apiKey: "AIzaSyDQiHvOHITmB2iK2RGnBdyISse_4w-i6wY",
  authDomain: "seat-selector-e5a6e.firebaseapp.com",
  databaseURL: "https://seat-selector-e5a6e-default-rtdb.firebaseio.com",
  projectId: "seat-selector-e5a6e",
  storageBucket: "seat-selector-e5a6e.appspot.com",
  messagingSenderId: "792831024255",
  appId: "1:792831024255:web:e2d22974511bb242baf34a"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const store = configureStore({
  reducer: {
    seats: seatsSlice.reducer,
    bookedSeats: bookedSeatSlice.reducer
  }
})
export type AppDispatch = typeof store.dispatch;



