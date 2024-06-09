import { useState } from 'react';
import axios from 'axios';

const authServer = 'http://localhost:6001';

export const useLogin = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const doRequest = async (email, password) => {
        try {
            const headers = {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            };

            setData(null);
            setIsLoading(true);
            const response = await axios.post(`${authServer}/api/Auth/Login`, { email, password }, headers);

            localStorage.setItem('TOKEN', response.data.access_token);

            setData({authenticated: true});
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, doRequest, error };
}