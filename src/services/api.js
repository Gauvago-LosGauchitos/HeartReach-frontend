import axios from "axios"
import { getToken } from "../utils/auth.js"
const apiClient = axios.create({
    baseURL: 'http://localhost:2690',
    timeout: 30000
})

export const registerRequest = async(user) => {
    try {
        return await apiClient.post('/user/register', user)
        
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const loginRequest = async(userLogin) =>{
    try {
        return await apiClient.post('/user/login', userLogin)
    } catch (error) {
        error: true,
        error
    }
}

export const getOrgs = async() =>{
    try {
        const response = await apiClient.get('/org/get')
        return response.data
    } catch (error) {
        error: true,
        error
    }
}

export const getOrgId = async(orgId) =>{
    try {
        const response = await apiClient.post('/org/searchById' ,{id:orgId})
        return response.data
    } catch (error) {
        error : true,
        error
    }
}

export const getUser = async () => {
    try {
        const tokenUser = getToken()
        const response = await apiClient.get('/user/getUser', {
            headers: {
                Authorization: tokenUser
            }
        })
        return response
        
    } catch (err) {
        return {
            error: true,
            errorDetails: err
        }
    }
}

export const updateUser = async (userData) => {
    try {
        const response = await apiClient.put('/user/updateProfile', userData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken')
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

