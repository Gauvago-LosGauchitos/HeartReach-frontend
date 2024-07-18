import { useState } from 'react';
import { searchUsers, searchOrganizations } from '../../services/api.js'

export const useSearch = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchUsers2 = async (query) => {
        setLoading(true);
        try {
            const response = await searchUsers(query);
            console.log(response)
            setSearchResults(response);
            setLoading(false);
            return response
        } catch (error) {
            console.error(error)
            setError(error.message);
            setLoading(false);
        }
    };

    const searchOrganizations2 = async (query) => {

        setLoading(true);
        try {
            const response = await searchOrganizations(query);
            console.log(response)
            setSearchResults(response);
            setLoading(false);
            return response
        } catch (error) {
            console.error(error)
            setError(error.message);
            setLoading(false);
        }
    };

    return { searchResults, loading, error, searchUsers2, searchOrganizations2 };
};

