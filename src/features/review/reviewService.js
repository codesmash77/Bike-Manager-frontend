import custom_axios from "../../axios/axiosSetup";
import { ApiConstants } from "../../constants/ApiConstant";

const createReview = async (review, userId, bikeId, resId, token) => {
    const response = await custom_axios(token).post(ApiConstants.REV.ADD(userId, bikeId, resId), {
        comment: review?.comment,
        rating : review?.rating,
        userName: review?.userName,
    })
    return response.data
}

const getReviewByBike = async (bikeId, token) => {
    const response = await custom_axios(token).get(ApiConstants.REV.GET_REV_BY_BIKE(bikeId))
    return response.data
}

const getReview = async (id, token) => {
    const response = await custom_axios(token).get(ApiConstants.REV.GET_REV(id))
    return response.data
}

const reviewService = {
    createReview,
    getReviewByBike,
    getReview,
}

export default reviewService;