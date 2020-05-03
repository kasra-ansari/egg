import Api from "../Api";
import store from "../../redux/store/index";

// const state = () => {
//     return store.getState()
// };

class RequestService {
    static login = async (mobile) => {
        try {
            return await Api.post({url: '/login', data: mobile})
        } catch (e) {

        }
    }

    static usersList = async () => {
        try {
            return await Api.get({url: '/users'})
        } catch (e) {

        }
    }

    static deleteUser = async (id) => {
        try {
            return await Api.delete({url: `/users/${id}`})
        } catch (e) {

        }
    }

    static createPost = async (data) => {
        try {
            return await Api.post({url: `/posts`, data: data})
        } catch (e) {

        }
    }
    
    static postList = async () => {
        try {
            return await Api.get({url: `/posts`})
        } catch (e) {
            
        }
    }
}

export default RequestService;
