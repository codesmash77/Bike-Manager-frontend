import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bikeService from './bikeService';

const initialState = {
    bikes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createBike = createAsyncThunk('bike/create', async ({ bike, userId },thunkAPI) => {
    try {
    const token = await thunkAPI.getState().auth?.user?.access_token
    return await bikeService.createBike(bike, userId, token)
    } catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getBike = createAsyncThunk('bike/getBike', async (bikeId, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth?.user?.access_token
        const res = await bikeService.getBike(bikeId,token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllBikes = createAsyncThunk('bike/getAllBikes', async ({limit, page, filter}, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth?.user?.access_token
        const res = await bikeService.getAllBikes(limit, page, filter, token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllBikesAdmin = createAsyncThunk('bike/getAllBikesAdmin', async ({limit, page, filter}, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth?.user?.access_token
        const res = await bikeService.getAllBikesAdmin(limit, page, filter, token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const updateBike = createAsyncThunk('bike/updateBike', async ({ userId, bikeId, bike }, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth?.user?.access_token
        const res = await bikeService.updateBike(bike, bikeId, userId, token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteBike = createAsyncThunk('bike/deleteBike', async ({ userId, bikeId }, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth?.user?.access_token
        const res = await bikeService.deleteBike(bikeId, userId, token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const bikeSlice = createSlice({
    name: 'bike',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBike.pending, (state) => {
                state.isLoading =true
            })
            .addCase(createBike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bikes = action.payload
            })
            .addCase(createBike.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getBike.pending, (state) => {
                state.isLoading =true
            })
            .addCase(getBike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bikes = action.payload
            })
            .addCase(getBike.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllBikes.pending, (state) => {
                state.isLoading =true
            })
            .addCase(getAllBikes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bikes = action.payload
            })
            .addCase(getAllBikes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllBikesAdmin.pending, (state) => {
                state.isLoading =true
            })
            .addCase(getAllBikesAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bikes = action.payload
            })
            .addCase(getAllBikesAdmin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateBike.pending, (state) => {
                state.isLoading =true
            })
            .addCase(updateBike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bikes = state.bikes.map((bike) =>
                bike.id === action.payload.id
                    ? {
                        ...bike,
                        model: action.payload.model,
                        color : action.payload.color,
                        location: action.payload.location,
                        isAvailable: action.payload.isAvailable,
                        avgRating: action.payload.avgRating,
                    }
                    : bike
                );
            })
            .addCase(updateBike.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteBike.pending, (state) => {
                state.isLoading =true
            })
            .addCase(deleteBike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bikes = state.bikes.filter(
                (bike) => bike.id !== action.payload.id
                );
            })
            .addCase(deleteBike.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = bikeSlice.actions
export default bikeSlice.reducer