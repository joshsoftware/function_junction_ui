import axios from 'axios';
import { API_ROOT } from '../config';

let axiosInstance = axios.create({
    baseURL: API_ROOT,
    headers: {
        'Accept': 'application/vnd.server.v1',
        'Content-Type': 'application/json',
    }
    // add code to send cookie here
});

axiosInstance.interceptors.request.use(request => {
    // generic error handler
    return request;
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, (error) => {
    Promise.reject(error);
});

export async function get(url) {
    try {
        const response = await axiosInstance.get(url);
        if (response.data.status === 200) {
            return response.data;
        }
        throw new Error(response.data.error);
    } catch (error) {
        throw error;
    }
}

export async function post(url, data) {
    try {
        const response = await axiosInstance.post(url, data);
        if (response.status) {
            return response.data;
        }
        throw new Error(response.data.error);
    } catch (error) {
        throw error;
    }
}

export async function put(url, data) {
    try {
        const response = await axiosInstance.put(url, data);
        if (response.status) {
            return response.data;
        }
        return new Error(response.data.error);
    } catch (error) {
        throw error;
    }
}

export async function del(url, data) {
    try {
        const response = await axiosInstance.delete(url, data);
        if (response.status) {
            return response.data;
        }
        return new Error(response.data.error);
    } catch (error) {
        throw error;
    }
}