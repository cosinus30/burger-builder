import axios from 'axios'
import { API_KEY } from './constants/firebase'

const instance = axios.create({
    baseURL: 'https://react-burger-app-2e4de.firebaseio.com/'
})

export default instance

instance.interceptors.response.use((response) => {
    return response;
},  (error) => {
    const data = {
        grant_type: 'refresh_token',
        refresh_token: localStorage.getItem('refreshToken')
    }
    if (error.response.status === 401 && error.response.data.error === 'Auth token is expired') {
        axios.post("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, data)
            .then((response) => {
                const newIdToken = response.data.id_token;
                localStorage.setItem('accessToken', newIdToken);
                //TODO Change auth param in the request
                console.log(error.config);
                const res = axios.request(error.config);
                Promise.resolve(res);
            }) 
    }
    return Promise.reject(error);
});

export const authInstance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
})

authInstance.interceptors.request.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

authInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

