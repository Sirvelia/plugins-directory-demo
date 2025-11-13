'use server'

import axios from 'axios'
import {generateToken} from './token';

const axiosInstance = axios.create({
    baseURL: 'https://api.ploogins.com/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(async request => {
    const { token } = await generateToken();
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
}, error => {
    return Promise.reject(error);
});

export async function createSearchIntent(params: SearchIntentParams): Promise<SearchIntent> {
    const response = await axiosInstance.post(`/search`, params)
    return response.data
}

export async function getResults(searchIntentId: string): Promise<SearchResults> {
    const response = await axiosInstance.get(`/get_results/?search_id=${searchIntentId}`)
    return response.data
}