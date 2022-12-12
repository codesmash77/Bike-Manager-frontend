import axios from "axios";

const custom_axios = (token = '') => axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        Authorization: "Bearer " + token,
        Accept: "*/*",
        "Content-Type": "application/json"
    },
    timeout: 5000
})

export default custom_axios;