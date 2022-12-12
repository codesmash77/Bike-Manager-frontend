import custom_axios from "../../axios/axiosSetup";
import { ApiConstants } from "../../constants/ApiConstant";

const createBike = async (bike, userId, token) => {
    const response = await custom_axios(token).post(ApiConstants.BIKE.ADD(userId), {
        model: bike.model,
        color : bike.color,
        location: bike.location,
        isAvailable: bike.isAvailable,
        avgRating: bike.avgRating,
    })
    return response.data
}

const getAllBikes = async (limit, page, filter,token) => {
    const response = await custom_axios(token).get(ApiConstants.BIKE.GET_ALLBIKES(limit, page, filter))
    return response.data
}

const getAllBikesAdmin = async (limit, page, filter, token) => {
    const response = await custom_axios(token).get(ApiConstants.BIKE.GET_ALLBIKESADMIN(limit, page, filter))
    return response.data
}

const getBike = async (bikeId, token) => {
    const response = await custom_axios(token).get(ApiConstants.BIKE.GET_BIKE(bikeId))
    return response.data
}

const updateBike = async (bike, bikeId, userId, token) => {
    const response = await custom_axios(token).patch(ApiConstants.BIKE.UPDATE_BIKE(userId, bikeId), {
        model: bike.model,
        color : bike.color,
        location: bike.location,
        isAvailable: bike.isAvailable,
        avgRating: bike.avgRating,
    })
    return response.data
}

const deleteBike = async (bikeId, userId, token) => {
    const response = await custom_axios(token).delete(ApiConstants.BIKE.DELETE_BIKE(userId, bikeId))
    return response.data
}

const bikeService = {
    createBike,
    getAllBikes,
    getAllBikesAdmin,
    getBike,
    updateBike,
    deleteBike,
}

export default bikeService;