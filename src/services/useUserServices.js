import { useState } from 'react';
import { http } from '../utils/http-common';

export const useListUsers = () => {
    const [data, setData] = useState({ data: [] });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.get('/api/User');
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}

export const useCreateUser = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const doRequest = async (item) => {
        try {
            setData(null);
            setIsLoading(true);
            const response = await http.post('/api/User', item);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, doRequest, error };
}

export const useGetUserById = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async (userId) => {
        try {
            setData(null);
            setIsLoading(true);
            const response = await http.get(`/api/User/${userId}`);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}


export const useUpdateUser = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const doRequest = async (userId, item) => {
        try {
            setData(null);
            setIsLoading(true);
            const response = await http.put(`/api/User/${userId}`, item);
            setData(true);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, doRequest, error };
}

