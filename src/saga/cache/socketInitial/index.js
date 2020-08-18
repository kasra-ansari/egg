import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call, select, spawn} from "redux-saga/effects";
import initWebSocket from "../../services/Websocket/socket2";

function* initial() {
    debugger

    const channel = yield call(initWebSocket);
    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}

function* initialWebSocket() {
    const reqChan = yield actionChannel(ActionType.SET_SESSION);

    while (true) {
        const action = yield take(reqChan);
        yield call(initial);
    }
}

export default initialWebSocket;
