import React from "react";
import ClickableBox from "./Seat";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '../js/store';
import { bookSeat } from "../js/BookedSeatSlice";
import { Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { seatData, bookedSeatData, isBookingSeat } = useSelector((state: any) => {
    const seatStats = state.seats.seatData;
    const boxData = [];
    for (let i = 0; i < seatStats.length; i++) {
      boxData.push({
        isSeatAvailable: seatStats[i].isSeatAvailable,
        isBooked: state.bookedSeats.bookedSeat.includes(i),
      })
    }
    return {
      seatData: boxData,
      bookedSeatData: state.bookedSeats.bookedSeat,
      isBookingSeat: state.bookedSeats.status === "booking",
    }
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'}}>
      {isBookingSeat && <> <CircularProgress color="success" /> <Typography variant="h6" gutterBottom> Booking seat </Typography></>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridAutoRows: "1fr", gap: "10px", marginTop: '20px' }}>
        {seatData.map((seat, index) => (
          <ClickableBox
            key={index}
            isSeatAvailable={seat.isSeatAvailable}
            isBooked={seat.isBooked}
            onClick={() => {
              if(seat.isSeatAvailable) {
                if(isBookingSeat) {
                  alert("Please wait until booking is completed");
                } else {
                  dispatch(bookSeat(index));
                }
                
              }
            }}
          />
        ))}
      </div>
      {bookedSeatData.length !== 0 && <Typography variant="h6" gutterBottom style={{ marginTop: '20px'}}> {`Your booked seat ${bookedSeatData}`} </Typography>}
      
    </div>
  );
};

export default App;