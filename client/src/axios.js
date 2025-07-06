import axios from "axios";

const instance = axios.create({
    baseURL:"https://employee-task-management-system-rye4.onrender.com/api",
    withCredentials:true
})

export default instance;