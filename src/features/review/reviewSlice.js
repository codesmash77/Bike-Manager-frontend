import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reviewService from './reviewService';

const initialState = {
    reviews: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createReview = createAsyncThunk('review/create', async ({ review, userId, bikeId, resId },thunkAPI) => {
try {
    const token = await thunkAPI.getState().auth.user.access_token
    return await reviewService.createReview(review, userId, bikeId, resId, token)
    } catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getReview = createAsyncThunk('review/getReview', async (reviewId, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth.user.access_token
        const res = await reviewService.getReview(reviewId,token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getReviewByBike = createAsyncThunk('review/getReviewByBike', async (bikeId, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth.user.access_token
        const res = await reviewService.getReviewByBike(bikeId,token)
        return res
    }
    catch (error) {
        const message = (error.response &&
            error.response.data && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.isLoading =true
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reviews = action.payload
            })
            .addCase(createReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getReview.pending, (state) => {
                state.isLoading =true
            })
            .addCase(getReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reviews = action.payload
            })
            .addCase(getReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getReviewByBike.pending, (state) => {
                state.isLoading =true
            })
            .addCase(getReviewByBike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reviews = action.payload
            })
            .addCase(getReviewByBike.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = reviewSlice.actions
export default reviewSlice.reducer