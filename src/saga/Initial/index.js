import {take, fork} from "redux-saga/effects";
import * as ActionType from "../../redux/app/actions/constants";
import initialWebSocket from "./initialWebSocket";

function* connect() {
    while (true) {
        try {
            const action = yield take(ActionType.SOCKET_INITIAL);
            yield fork(initialWebSocket, action.url)

        } catch (e) {

        }


    }
}

export default connect;
