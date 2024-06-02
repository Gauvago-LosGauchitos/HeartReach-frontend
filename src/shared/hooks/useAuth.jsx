import { useState } from "react";
import toast from "react-hot-toast";
import { loginRequest, registerRequest } from "../../services/api";


export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false)

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
                // Guardar el token en localStorage
                localStorage.setItem('authToken', response.data.token);

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

    const register = async (name, surname, dpi, username, password, email, phone,
        habilities, imageProfile) => {
        setIsLoading(true)
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
        const response = await registerRequest(user, imageProfile = '')
        setIsLoading(false)
    
        if (response.error) {
          return toast.error(
            response?.e?.response?.data ||
            'Error general al intentar registrar el usuario. Intenta de nuevo.'
          )
        } else {
          toast.success('¡Te haz registrado ahora inicia sesion!')
        }
        console.log(response)
      }


  return {
    login,
    register,
    isLoading
}
}

