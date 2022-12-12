import custom_axios from "../../axios/axiosSetup"
import { ApiConstants } from '../../constants/ApiConstant';

const register = async (userData) => {
    const response = await custom_axios().post(ApiConstants.USER.ADD, {
        username: userData.name,
        email: userData.email,
        password: userData.password
    })
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

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

    return response.data
}

const getUsers = async () => {
    const response = await custom_axios().get(ApiConstants.USER.GET)
    return response.data
}

const getUsersById = async (id) => {
    const response = await custom_axios().get(ApiConstants.USER.GET_BYID(id))
    return response.data
}

const getUsersByEmail = async (email) => {
    const response = await custom_axios().get(ApiConstants.USER.GET_BYMAIL(email))
    return response.data
}

const upgradeUser = async (id) => {
    const response = await custom_axios().patch(ApiConstants.USER.UPGRADE(id))
    return response.data
}

const update = async (id, userData) => {
    const response = await custom_axios().patch(ApiConstants.USER.UPDATE(id), {
        username: userData.name,
        email: userData.email,
        password: userData.password
    })
    return response.data
}

const updateUser = async (id, userData) => {
    const response = await custom_axios().patch(ApiConstants.USER.UPDATE_USER(id), {
        username: userData.name,
        email: userData.email,
        password: userData.password
    })
    return response.data
}

const deleteUser = async (id) => {
    const response = await custom_axios().patch(ApiConstants.USER.DELETE(id))
    return response.data
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