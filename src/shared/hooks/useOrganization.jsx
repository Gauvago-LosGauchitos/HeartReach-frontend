import { useState, useEffect } from 'react'
import { getOrgs, getOrgId } from '../../services/api.js'

export const useOrganization = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [org, setOrg] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrg, setSelectdOrg] = useState([])

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
  
  const getOrgsId = async (orgId)=>{
    
    
    try {
      const response = await getOrgId(orgId)
      if (response.error) {
        console.error('Error al obtener la organización:', response.error);
        return;
      }
      setSelectdOrg(response.organizations)
    } catch (error) {
        console.error('error obteniedo a la org', error)
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrgs();
  }, []);
  return {
    org,
    error,
    isLoading,
    fetchOrgs,
    selectedOrg, 
    getOrgsId
  }
}