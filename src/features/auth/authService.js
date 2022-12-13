import custom_axios from "../../axios/axiosSetup"
import { ApiConstants } from '../../constants/ApiConstant';
import jwt_decode from "jwt-decode";

const register = async (userData) => {
    const response = await custom_axios().post(ApiConstants.USER.ADD, {
        username: userData.name,
        email: userData.email,
        password: userData.password
    })
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    const decoded = jwt_decode(response?.data?.access_token)
    const access_token = response?.data
    const data = { ...access_token, userId: decoded?.userId, userName: decoded?.userName, userRole: decoded.userRole, password: decoded.password }

    return response.data
}

const login = async (userData) => {
    const response = await custom_axios().post(ApiConstants.AUTH.LOGIN, {
        email: userData.email,
        password: userData.password
    })
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    const decoded = jwt_decode(response?.data?.access_token);
    const access_token = response?.data
    const data = { ...access_token, userId: decoded?.userId, userName: decoded?.userName, userRole: decoded.userRole, password: decoded.password }

    return response.data
}

const getUsers = async (token) => {
    const response = await custom_axios(token).get(ApiConstants.USER.GET)
    return response.data
}

const getUsersById = async (id, token) => {
    const response = await custom_axios(token).get(ApiConstants.USER.GET_BYID(id))
    return response.data
}

const getUsersByEmail = async (email, token) => {
    const response = await custom_axios(token).get(ApiConstants.USER.GET_BYMAIL(email))
    return response.data
}

const upgradeUser = async (id, token) => {
    const response = await custom_axios(token).patch(ApiConstants.USER.UPGRADE(id))
    return response.data
}

const update = async (id, userData, token) => {
    const response = await custom_axios(token).patch(ApiConstants.USER.UPDATE(id), {
        username: userData.username,
        email: userData.email,
        password: userData.password
    })
    return response
}

const updateUser = async (id, userData, token) => {
    const response = await custom_axios(token).patch(ApiConstants.USER.UPDATE_USER(id), {
        username: userData.username,
        email: userData.email,
        password: userData.password
    })
    return response
}

const deleteUser = async (id, token) => {
    const response = await custom_axios(token).patch(ApiConstants.USER.DELETE(id))
    return response
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
    getUsers,
    getUsersById,
    getUsersByEmail,
    upgradeUser,
    update,
    updateUser,
    deleteUser,
}

export default authService