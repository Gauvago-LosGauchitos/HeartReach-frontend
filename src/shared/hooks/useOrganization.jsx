import React from 'react'
import { getOrgs} from '../../services/api.js'

export const useOrganization = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [org, setOrg] = useState([]);
  const fetchOrgs = async () => {
    try {
      const response = await getOrgs();
      if (response.error) {
        console.error('Error al obtener las organizaciones:', response.error);
        return;
      }
      setOrg(response.data);
    } catch (error) {
      console.error("Error al obtener las organizaciones:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    fetchOrgs
  }
}

