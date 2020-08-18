import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call} from "redux-saga/effects";
import {socketChannel, socket} from "../Initial/initialWebSocket";

function* logoutMiddleware(action) {
    yield put({type: ActionType.UNSET_IS_LOGIN});
    if (socket)
        yield socket.close();
    if (socketChannel)
        yield socketChannel.close();
    yield localStorage.removeItem('sid');
    yield localStorage.removeItem('isLogin');
}

function* watchLogout() {
    const reqChan = yield actionChannel(ActionType.UNSET_SESSION);

    while(true) {
        try {
            const action = yield take(reqChan);

            yield call(logoutMiddleware, action);

        } catch (e) {
            console.log(e)
        }
    }
}

export default watchLogout;
