import { useState, useEffect } from 'react';
import { getOrgs, getOrgId, getlistarVolunteeringDisponiblesEnCurso } from '../../services/api.js';

export const useOrganization = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [org, setOrg] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState([]);
  const [volunteering, setVolunteering] = useState([]);

  const fetchOrgs = async () => {
    try {
      const response = await getOrgs();
      if (response.error) {
        console.error('Error al obtener las organizaciones:', response.error);
        return;
      }
      setOrg(response);
    } catch (error) {
      console.error('Error al obtener las organizaciones:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrgsId = async (orgId) => {
    try {
      const response = await getOrgId(orgId);
      if (response.error) {
        console.error('Error al obtener la organización:', response.error);
        return;
      }
      setSelectedOrg(response.organizations);
    } catch (error) {
      console.error('Error obteniendo la organización:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVolunteering = async (id) => {
    setIsLoading(true);
    try {
        console.log(`Fetching volunteering data for organization id: ${id}`);
        const response = await getlistarVolunteeringDisponiblesEnCurso(id);
        console.log('Fetch volunteering response:', response); 
        if (response.error) {
            console.error('Error obteniendo el voluntariado disponible:', response.message);
            setError(response.message);
        } else {
            setVolunteering(response.data);
            console.log('Volunteering Data:', response.data); 
        }
    } catch (error) {
        console.error('Error obteniendo el voluntariado disponible:', error.message);
        setError(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  return {
    org,
    error,
    isLoading,
    fetchOrgs,
    selectedOrg,
    getOrgsId,
    volunteering,
    fetchVolunteering
  };
};
