import { useState } from 'react';
import { http } from '../utils/http-common';

export const useListSupplier = () => {
    const [data, setData] = useState({ data: [] });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.get('/api/Supplier');
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}

export const useGetSupplierById = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async (supplierId) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.get(`/api/Supplier/${supplierId}`);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}

export const useGetSupplierSearch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async (keyword) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.get(`/api/Supplier/Search?keywords=${keyword}`);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, getData, error };
}

export const useCreateSupplier = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const doRequest = async (item) => {
        try {
            setData([]);
            setIsLoading(true);
            console.log(item);
            const response = await http.post(`/api/Supplier`, item);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, doRequest, error };
}

export const useUpdateSupplier = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const doRequest = async (supplierId, item) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.put(`/api/Supplier/${supplierId}`, item);
            setData(true);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, doRequest, error };
}

export const useRemoveSupplier = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const doRequest = async (supplierId) => {
        try {
            setData([]);
            setIsLoading(true);
            const response = await http.delete(`/api/Supplier/${supplierId}`,);
            setData(true);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, doRequest, error };
}
