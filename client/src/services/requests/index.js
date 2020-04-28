import Api from "../Api";
import store from "../../redux/store/index";
import {setSelectedInstrumentId, setWatchList} from "../../redux/app/actions";

const state = () => {
    return store.getState()
};

class RequestService {
    static login = async (mobile) => {
        try {
            return await Api.post({url: '/login', data: mobile})
        } catch (e) {

        }
    }
}

export default RequestService;
