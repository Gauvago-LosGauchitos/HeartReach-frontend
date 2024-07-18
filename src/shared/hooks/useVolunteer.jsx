import { useState, useEffect } from "react"
import { getVolunteerTypes, registerVolunteer, listVolunteers, getVolunteerById } from "../../services/api"

export const useVolunteer = () => {
    const [typesVolunteer, setTypesVolunteer, listVolunteer] = useState()
    const [volunteers, setVolunteers] = useState([])
    const [selectedVolu, setSelectedVolu] = useState([])
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

    //obtener los voluntariados
    const getVolunteers = async () =>{
        setLoading(true)
        try {
            const response = await listVolunteers()
            setVolunteers(response.data.data)
            return response.data.data
            
        } catch (err) {
            console.error("Error al obtener los voluntariados:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    //Obtener datos de un voluntairado
    const getVolunteer = async (id) =>{
        setLoading(true)
        try {
            const response = await getVolunteerById(id)
            setSelectedVolu(response)
            return response
            
        } catch (err) {
            console.error("Error al obtener el voluntariado:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect (() => {
        volunteerTypes()
        getVolunteers()
        }, [])

    return {
        volunteerTypes,
        typesVolunteer,
        loading,
        error,
        registerVolunteers,
        volunteers,
        selectedVolu,
        getVolunteer

    }
}

