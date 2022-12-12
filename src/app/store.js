import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bikeReducer from '../features/bike/bikeSlice';
import reservationReducer from '../features/reservation/reservationSlice';
import reviewReducer from '../features/review/reviewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bike: bikeReducer,
    reservation: reservationReducer,
    review: reviewReducer,
  },
});
