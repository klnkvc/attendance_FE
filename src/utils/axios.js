import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_APIURL, // replace with your API base URL
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});
instance.interceptors.request.use(
    (config)=>{
        const authorizationKey = import.meta.env.VITE_APP_AUTH
        const token = localStorage.getItem(authorizationKey)

        if (token&&config.headers){
            config.headers[authorizationKey] = token
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            const authorizationKey = import.meta.env.VITE_APP_AUTH
            localStorage.removeItem(authorizationKey);
            setTimeout(() => {
                window.location.href = `${import.meta.env.VITE_APP_URL}/login`
            }, 200);
        }
        return Promise.reject(error.response?.data);
    }
)

export default instance;