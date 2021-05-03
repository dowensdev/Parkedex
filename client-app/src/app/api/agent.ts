import axios, { AxiosError, AxiosResponse } from 'axios';
import { Park } from '../models/park';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';
import { history } from '../..'
import { VisitedPark } from '../models/visitedPark';
import { PaginatedResult } from '../models/pagination';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:44338/api';

//Sending token up with requests to API
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    const pagination = response.headers['pagination'];
    console.log(response);
    if(pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
    }, (error: AxiosError) => {
    const{data, status, config} = error.response!;
    switch(status) {
        case 400:
            if(typeof data === 'string') {
                //toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('not-found');
            }
            if(data.errors) {
                const modalStateErrors = [];
                for(const key in data.errors) {
                    if(data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            //toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const data = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) =>axios.get<T>(url).then(data),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(data),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(data),
    del: <T>(url: string) => axios.delete<T>(url).then(data)
}

const Parks = {
    getAll: (params: URLSearchParams) => axios.get<PaginatedResult<Park[]>>('/parks', {params})
        .then(data),
    get: (id: string) => requests.get<Park>(`/parks/${id}`)
}

const VisitedParks = {
    getVisited: () => requests.get<VisitedPark[]>('/UserParks/'),
    addVisited: (id: string) => requests.put<void>(`/UserParks/${id}`, {}),
    removeVisited: (id: string) => requests.del<void>(`/UserParks/${id}`)
}

const Users = {
    current: () => requests.get<User>('/user'),
    login: (user: UserFormValues) => requests.post<User>('/user/login', user),
    register: (user: UserFormValues) => requests.post<User>('/user/register', user),
}

const agent = {
    Parks,
    Users,
    VisitedParks
}

export default agent;