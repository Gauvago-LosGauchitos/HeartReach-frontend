import { useState, useEffect } from "react"
import { getVolunteerTypes, registerVolunteer } from "../../services/api"

export const useVolunteer = () => {
    const [typesVolunteer, setTypesVolunteer] = useState()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const volunteerTypes = async () => {
        setLoading(true)
        try {
            const response = await getVolunteerTypes()
            setTypesVolunteer(response.data)
            return response
            
        } catch (err) {
            console.error("Error al obtener los tipos de voluntariado:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const registerVolunteers = async (volunteerData) =>{
        setLoading(true)
        try {
            const response = await registerVolunteer(volunteerData)
            return response
            
        } catch (err) {
            console.error("Error al registrar el voluntariado:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect (() => {
        volunteerTypes()
        }, [])

    return {
        volunteerTypes,
        typesVolunteer,
        loading,
        error,
        registerVolunteers

    }
}

