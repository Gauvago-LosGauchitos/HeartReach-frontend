import axios from "axios"
import { getToken } from "../utils/auth.js"
import toast from "react-hot-toast";

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
        const response = await apiClient.post('/user/login', userLogin)
        console.log(response)
        return response
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
    console.log(orgId)
    
    try {
        const response = await apiClient.post('/org/search' ,{id:orgId})
        return response.data
    } catch (error) {
        error : true,
        error
    }
}

//Buscar usuario por coincidencia
export const searchUsers = async (query) => {
    try {
        const response = await apiClient.get(`/user/search/users?query=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error searching users:", error);
        throw error;
    }
};

//Buscar organizacion por coincidencia
export const searchOrganizations = async (query) => {
    try {
        const response = await apiClient.get(`/org/search/organizations?query=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error searching organizations:", error);
        throw error;
    }
};

// Obtener mensajes privados antiguos entre usuario y organización
export const getPrivateMessages = async (userId, organizationId) => {
    try {
        const response = await apiClient.post('/user/privateMessages', { user: userId, organization: organizationId });
        return response.data;
    } catch (error) {
        console.error("Error getting private messages:", error);
        throw error;
    }
};

// Obtener mensajes privados antiguos entre dos usuarios
export const getUserMessages = async (sender, receiver) => {
    try {
        const response = await apiClient.post('/user/userMessages', { sender}, {receiver });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Error getting user messages:", error);
        throw error;
    }
};

// Enviar mensaje privado entre usuario y organización
export const sendPrivateMessage = async (data) => {
    try {
        const response = await apiClient.post('/user/privateMessages/send', data);
        return response.data;
    } catch (error) {
        console.error("Error sending private message:", error);
        throw error;
    }
};

// Enviar mensaje privado entre dos usuarios
export const sendUserMessage = async (data) => {
    try {
        const response = await apiClient.post('/user/userMessages/send', data);
        return response.data;
    } catch (error) {
        console.error("Error sending user message:", error);
        throw error;
    }
};

// Función para obtener contactos de un usuario
export const getContacts = async () => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await apiClient.post('/user/contacts', {}, {
            headers: {
                'Authorization': authToken
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error getting contacts:", error);
        throw error;
    }
};


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

//Enviar solicitud 
export const orgRequest = async (data) => {
    console.log(data)
    try {
        const tokenUser = getToken(); 
        const response = await apiClient.post('/org/request', data, {
            headers: {
                'Content-Type': 'application/json',
               'Authorization': tokenUser
            }
        }); 
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

//Obtener tipos de voluntariado
export const getVolunteerTypes = async () => {
    try {
        const response = await apiClient.get('/volu//getTypesOfVolunteering', {
            headers: {
                'Authorization': localStorage.getItem('authToken')
            }
        })
        return response
        
    } catch (error) {
        console.error('Error getting types of volunteer:', error);
        toast.error(error.response?.data?.message);
        throw error;
    }
}

//Registrar voluntariado
export const registerVolunteer = async (data) => {
    console.log(data)
    try {
        const response = await apiClient.post('/volu//registerV', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken')
            }
        })
        return response
        
    } catch (error) {
        console.error('Error register volunteer:', error);
        toast.error(error.response?.data?.message);
        throw error;
    }
}

//Listar voluntariados
export const listVolunteers = async () => {
    try {
        const response = await apiClient.get('/volu//listarVolunteering', {
            headers: {
                'Authorization': localStorage.getItem('authToken') // Obtener el token del localStorage
            }
        })
        console.log(response)
        return response

    } catch (error) {
        console.error('Error buscando los voluntariados', error)
        toast.error(error.response.data.message)
        throw error;

    }
}