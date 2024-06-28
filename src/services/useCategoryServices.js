import { useState } from 'react';
import { http } from '../utils/http-common';

export const useListCategory = () => {
    const [data, setData] = useState({ data: [] });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.get('/api/Category');
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}

export const useGetCategoryById = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async (categoryId) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.get(`/api/Category/${categoryId}`);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}

export const useGetCategorySearch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async (keyword) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.get(`/api/Category/Search?keywords=${keyword}`);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}

export const useCreateCategory = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const doRequest = async (item) => {
        try {
            setData([]);
            setIsLoading(true);
            console.log(item);
            const response = await http.post(`/api/Category`, item);
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

    const doRequest = async (categoryId, item) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.put(`/api/Category/${categoryId}`, item);
            setData(true);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, doRequest, error };
}

export const useRemoveCategory = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const doRequest = async (categoryId) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.delete(`/api/Category/${categoryId}`,);
            setData(true);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, doRequest, error };
}
