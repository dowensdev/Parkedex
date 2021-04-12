import axios, { AxiosResponse } from 'axios';
import { Park } from '../models/park';

axios.defaults.baseURL = 'https://localhost:44338/api';
const data = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) =>axios.get<T>(url).then(data),
}

const Parks = {
    getAll: () => requests.get<Park[]>('/parks')
}

const agent = {
    Parks
}

export default agent;