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
export const getUserMessages = async (senderId, receiverId) => {
    try {
        const response = await apiClient.post('/user/userMessages', { sender: senderId, receiver: receiverId });
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


