import { useState } from 'react';
import { http } from '../utils/http-common';

export const useListUnit = () => {
    const [data, setData] = useState({ data: [] });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.get('/api/Unit');
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}

export const useGetUnitById = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async (unitId) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.get(`/api/Unit/${unitId}`);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}

export const useGetUnitSearch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async (keyword) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.get(`/api/Unit/Search?keywords=${keyword}`);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}

export const useCreateUnit = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const doRequest = async (item) => {
        try {
            setData([]);
            setIsLoading(true);
            console.log(item);
            const response = await http.post(`/api/Unit`, item);
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

    const doRequest = async (unitId, item) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.put(`/api/Unit/${unitId}`, item);
            setData(true);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, doRequest, error };
}

export const useRemoveUnit = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const doRequest = async (unitId) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.delete(`/api/Unit/${unitId}`,);
            setData(true);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, doRequest, error };
}
