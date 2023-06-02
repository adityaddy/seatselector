import React, { FC, useEffect, useState } from 'react';
import CountBox from './Counter';
import Picker from './Picker';
import Typography from "@mui/material/Typography";
import { getFirestore, collection, onSnapshot} from "firebase/firestore"; 
import { useDispatch } from 'react-redux'
import { updateSeatStatus, Seat } from '../js/SeatSlice';
import { AppDispatch } from '../js/store';


const MainPage: FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [totalSeat, setTotalSeat] = useState<number>(0);
  const [availableSeat, setAvailableSeat] = useState<number>(0);
  useEffect(() => {
    const db = getFirestore();
    onSnapshot(collection(db, "seats"), (snapshot) => {
      if(!snapshot.empty) {
        const data: Seat[] = [];
        let available = 0;
        snapshot.forEach((doc) => {
          
          data.push({
            seatId: parseInt(doc.id),
            isSeatAvailable: !doc.data().isOccupied,
          });
          if(!doc.data().isOccupied) {
            available++;
          }
        });
        setTotalSeat(data.length);
        setAvailableSeat(available);
        dispatch(updateSeatStatus(data))
      }
    })
  }, []);
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography variant="h1" gutterBottom> Seat Selector </Typography>
      <Typography variant="h6" gutterBottom> Please select an available seat </Typography>
      <div style={{
        display: 'flex',
        marginTop: '20px',
      }}>
        <CountBox title="Total" count={totalSeat} />
        <CountBox title="Available" count={availableSeat} />
      </div>
      <Picker />
    </div>
  );
};

export default MainPage;