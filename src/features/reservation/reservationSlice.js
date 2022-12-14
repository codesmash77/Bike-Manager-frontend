import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reservationService from './reservationService';

const initialState = {
    reservations: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createReservation = createAsyncThunk('reservation/create', async ({ reservation, id, userId },thunkAPI) => {
try {
    const token = await thunkAPI.getState().auth?.user?.access_token
    return await reservationService.createReservation(reservation, id, userId, token)
    } catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getReservation = createAsyncThunk('reservation/getReservation', async (resId, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth?.user?.access_token
        const res = await reservationService.getReservation(resId,token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getReservationByUser = createAsyncThunk('reservation/getReservationByUser', async (userId, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth?.user?.access_token
        const res = await reservationService.getReservationByUser(userId,token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getReservationByBike = createAsyncThunk('reservation/getReservationByBike', async (bikeId, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth?.user?.access_token
        const res = await reservationService.getReservationByBike(bikeId,token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getReservationByUserAndBike = createAsyncThunk('reservation/getReservationByUserAndBike', async ({userId, bikeId}, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth?.user?.access_token
        const res = await reservationService.getReservationByUserAndBike(userId, bikeId, token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllReservations = createAsyncThunk('reservation/getAllReservations', async (_, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth?.user?.access_token
        const res = await reservationService.getAllReservations(token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const updateReservation = createAsyncThunk('reservation/updateReservation', async ({ userId, resId, reserve }, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth?.user?.access_token
        const res = await reservationService.updateReservation(reserve, resId, userId, token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteReservation = createAsyncThunk('reservation/deleteReservation', async ({ userId, resId }, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth?.user?.access_token
        const res = await reservationService.deleteReservation(resId, userId, token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const cancelReservation = createAsyncThunk('reservation/cancelReservation', async ({ userId, resId }, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth?.user?.access_token
        const res = await reservationService.cancelReservation(resId, userId, token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createReservation.pending, (state) => {
                state.isLoading =true
            })
            .addCase(createReservation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reservations = action.payload
            })
            .addCase(createReservation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getReservation.pending, (state) => {
                state.isLoading =true
            })
            .addCase(getReservation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reservations = action.payload
            })
            .addCase(getReservation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getReservationByUser.pending, (state) => {
                state.isLoading =true
            })
            .addCase(getReservationByUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reservations = action.payload
            })
            .addCase(getReservationByUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getReservationByBike.pending, (state) => {
                state.isLoading =true
            })
            .addCase(getReservationByBike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reservations = action.payload
            })
            .addCase(getReservationByBike.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getReservationByUserAndBike.pending, (state) => {
                state.isLoading =true
            })
            .addCase(getReservationByUserAndBike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reservations = action.payload
            })
            .addCase(getReservationByUserAndBike.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllReservations.pending, (state) => {
                state.isLoading =true
            })
            .addCase(getAllReservations.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reservations = action.payload
            })
            .addCase(getAllReservations.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateReservation.pending, (state) => {
                state.isLoading =true
            })
            .addCase(updateReservation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reservations = state.reservations?.items?.map((reservation) =>
                reservation.id === action.payload.id
                    ? {
                        ...reservation,
                        model: action.payload.model,
                        startDate : action.payload.startDate,
                        endDate: action.payload.endDate,
                        userEmail: action.payload.userEmail,
                    }
                    : reservation
                );
                console.log(state.reservations)
            })
            .addCase(updateReservation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(cancelReservation.pending, (state) => {
                state.isLoading =true
            })
            .addCase(cancelReservation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reservations = state.reservations?.items?.map((reservation) =>
                reservation.id === action.payload.id
                    ? {
                        ...reservation,
                        status: action.payload.status,
                    }
                    : reservation
                );
            })
            .addCase(cancelReservation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteReservation.pending, (state) => {
                state.isLoading =true
            })
            .addCase(deleteReservation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reservations = state.reservations?.items?.filter(
                (reservation) => reservation.id !== action.payload.id
                );
            })
            .addCase(deleteReservation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})



export const { reset } = reservationSlice.actions
export default reservationSlice.reducer