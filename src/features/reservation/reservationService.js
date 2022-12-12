import custom_axios from "../../axios/axiosSetup";
import { ApiConstants } from "../../constants/ApiConstant";

const createReservation = async (reservation, bikeId, userId, token) => {
    const response = await custom_axios(token).post(ApiConstants.RES.ADD(userId, bikeId), {
        model: reservation.model,
        startDate : reservation.startDate,
        endDate: reservation.endDate,
        userEmail: reservation.userEmail,
    })
    return response.data
}

const getAllReservations = async (token) => {
    const response = await custom_axios(token).get(ApiConstants.RES.ALL_RES)
    return response.data
}

const getReservation = async (resId, token) => {
    const response = await custom_axios(token).get(ApiConstants.RES.GET_RES(resId))
    return response.data
}

const getReservationByUser = async (userId, token) => {
    const response = await custom_axios(token).get(ApiConstants.RES.GET_RES_BY_USER(userId))
    return response.data
}

const getReservationByBike = async (bikeId, token) => {
    const response = await custom_axios(token).get(ApiConstants.RES.GET_RES_BY_BIKE(bikeId))
    return response.data
}

const getReservationByUserAndBike = async (userId, bikeId, token) => {
    const response = await custom_axios(token).get(ApiConstants.RES.GET_RES_BY_USER_AND_BIKE(userId, bikeId))
    return response.data
}

const updateReservation = async (reservation, resId, userId, token) => {
    const response = await custom_axios(token).patch(ApiConstants.RES.UPDATE_RES(userId, resId), {
        model: reservation.model,
        startDate : reservation.startDate,
        endDate: reservation.endDate,
        userEmail: reservation.userEmail,
    })
    return response.data
}

const cancelReservation = async (resId, userId, token) => {
    const response = await custom_axios(token).patch(ApiConstants.RES.CANCEL_RES(userId, resId))
    return response.data
}

const deleteReservation = async (resId, userId, token) => {
    const response = await custom_axios(token).delete(ApiConstants.RES.DELETE_RES(userId, resId))
    return response.data
}

const reservationService = {
    createReservation,
    getAllReservations,
    getReservation,
    getReservationByUser,
    getReservationByBike,
    getReservationByUserAndBike,
    updateReservation,
    cancelReservation,
    deleteReservation,
}

export default reservationService;