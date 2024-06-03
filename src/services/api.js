import axios from "axios"

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
        return await apiClient.get('/org/get')
    } catch (error) {
        error: true,
        error
    }
}
