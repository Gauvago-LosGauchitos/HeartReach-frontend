import { useState, useEffect } from 'react'
import { getOrgs } from '../../services/api.js'

export const useOrganization = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [org, setOrg] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrgs = async () => {
    try {
      const response = await getOrgs();
      if (response.error) {
        console.error('Error al obtener las organizaciones:', response.error);
        return;
      }
      setOrg(response);
    } catch (error) {
      console.error("Error al obtener las organizaciones:", error);
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
    fetchOrgs
  }
}
