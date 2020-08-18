import Axios from 'axios';

class Api {
    static createApi(options = {}) {
        let headers = {
            // 'Authorization': `Bearer ${getToken()}`,
        };

        return Axios.create({baseURL: window.env['API_SERVER'], headers })[options.method](options.url, options.data).catch(e => console.log(e))
    };

    static get(options) {
        return Api.createApi({...options, method: 'get'});
    };

    static post(options) {
        return Api.createApi({...options, method: 'post'});
    };

    static put(options) {
        return Api.createApi({...options, method: 'put'});
    };

    static delete(options) {
        return Api.createApi({...options, method: 'delete'});
    };

    static patch(options) {
        return Api.createApi({...options, method: 'patch'});
    };
}

export default Api;
