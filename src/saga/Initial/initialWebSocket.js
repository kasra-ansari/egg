import * as ActionType from "../../redux/app/actions/constants";
import {put, take, call} from "redux-saga/effects";
import WebsocketConnection from "../../services/Websocket/socket2";
import createSocketChannel from "./channel";

export let socket;
export let socketChannel;

function* initialWebSocket(url) {
    try {
        socket = yield call(WebsocketConnection, url);
        socketChannel = yield call(createSocketChannel, socket);

        while (true) {
            const payload = yield take(socketChannel);
            try {
                const socketData = yield JSON.parse(payload.replace(/'/g, '"'));

                yield put({type: ActionType.INCOMING_DATA, data: socketData});
            } catch (e) {
                console.log("ERROR IN PARSE DATA", e, socket )
            }


        }
    } catch (e) {
        console.log("ERROR SOCKET CONNECTION", e, socket )
        yield put({type: ActionType.UNSET_SESSION});
    }

}

export default initialWebSocket;
