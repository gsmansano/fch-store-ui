import { useState } from 'react';
import { http } from '../utils/http-common';

export const useListClient = () => {
    const [data, setData] = useState({ data: [] });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.get('/api/Client');
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}

export const useGetClientById = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async (clientId) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.get(`/api/Client/${clientId}`);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}

export const useGetClientSearch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async (keyword) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.get(`/api/Client/Search?keywords=${keyword}`);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}

export const useCreateClient = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const doRequest = async (item) => {
        try {
            setData([]);
            setIsLoading(true);
            console.log(item);
            const response = await http.post(`/api/Client`, item);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, doRequest, error };
}

export const useUpdatePartner = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const doRequest = async (clientId, item) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.put(`/api/Client/${clientId}`, item);
            setData(true);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, doRequest, error };
}

export const useRemoveClient = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const doRequest = async (clientId) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.delete(`/api/Client/${clientId}`,);
            setData(true);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, doRequest, error };
}
