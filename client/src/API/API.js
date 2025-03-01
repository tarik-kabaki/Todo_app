import axios from 'axios';

export const getData = async (endpoint) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the data:', error);
        throw error;
    }
};

export const getData_onetask = async (endpoint, id) => {
    try {
        const response = await axios.get(`${endpoint}${id}`);
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the data:', error);
        throw error;
    }
};

export const updateData = async (endpoint, id, data) => {
    try {
        const response = await axios.patch(`${endpoint}update/${id}`, {
            ...data
        });
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the data:', error);
        throw error;
    }
};

export const removeData = async (endpoint, id) => {
    try {
        const response = await axios.delete(`${endpoint}remove/${id}`);
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the data:', error);
        throw error;
    }
};
