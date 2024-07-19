import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { loginRequest, registerRequest } from "../../services/api"; // No necesitamos getLoguedUser aquí
import { getLoggedUser } from '../../utils/auth.js';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userU, setUserU] = useState(null);

    const login = async (identifier, password) => {
        setIsLoading(true);
        try {
            const isEmail = identifier.includes('@');
            const userLogin = {
                [isEmail ? 'email' : 'username']: identifier,
                password
            };

            const response = await loginRequest(userLogin);
            if (response.error) {
                toast.error(
                    response?.e?.response?.data ||
                    'Email o contraseña incorrectos. Inténtalo de nuevo.'
                );
                return false;
            } else {
                toast.success('¡Has iniciado sesión!');
                const userData = {
                    id: response.data.loggedUser.uid,
                    name: response.data.loggedUser.name,
                    username: response.data.loggedUser.username,
                    role: response.data.loggedUser.role
                }
                // Guardar el token en localStorage
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userLogued', JSON.stringify(userData));

                setUserU(userData); // Establecer el usuario autenticado
                return true;
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            toast.error('Se produjo un error al iniciar sesión. Inténtalo de nuevo más tarde.');
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const register = async (name, surname, dpi, username, password, email, phone, habilities, imageProfile) => {
        setIsLoading(true);
        const user = {
            name,
            surname,
            dpi,
            username,
            password,
            email,
            phone,
            habilities,
            imageProfile
        }
        const response = await registerRequest(user);
        setIsLoading(false);

        if (response.error) {
            toast.error(
                response?.e?.response?.data ||
                'Error general al intentar registrar el usuario. Intenta de nuevo.'
            );
        } else {
            toast.success('¡Te haz registrado ahora inicia sesion!');
        }
        console.log(response);
    }

    useEffect(() => {
        const user = getLoggedUser();
        if (user) {
            setUserU(user);
        }
        setLoading(false);
    }, []);

    return {
        userU,
        login,
        loading,
        register,
        isLoading
    }
}
