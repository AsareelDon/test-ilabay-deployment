import axios from "./axios";
import toastMessage from "../templates/toastify";

export const fetchBinLists = async (token) => {
    const response = await axios.get('bins', {
        headers: { Authorization: `Bearer ${token}`, }
    });
    if (!response) {
        toastMessage.error(response?.data?.errorMessage);
    }
    return response?.data?.bins;
};

export const fetchBinReadings = async (token, binId) => {
    const response = await axios.get(`bin_status/${binId}`, {
        headers: { Authorization: `Bearer ${token}`, }
    });
    if (!response) {
        toastMessage.error(response?.data?.errorMessage);
    }
    return response;
};

export const fetchBinHistory = async (token) => {
    const response = await axios.get(`bin_history`, {
        headers: { Authorization: `Bearer ${token}`, }
    });
    if (!response) {
        toastMessage.error(response?.data?.errorMessage);
    }
    return response;
};

export const fetchBinWasteVolumeReadings = async (token) => {
    const response = await axios.get(`accumulated_waste`, {
        headers: { Authorization: `Bearer ${token}`, }
    });
    return [response.data];
};

export const registerNewBin = async ({ token, binData }) => {
    const response = await axios.post(`protected/create-bin`, binData, {
        headers: { 
            'Content-type': 'application/json', 
            Authorization: `Bearer ${token}`,
        }
    });
    if (!response) {
        toastMessage.error(response?.data?.errorMessage);
    }
    return response.data;
};