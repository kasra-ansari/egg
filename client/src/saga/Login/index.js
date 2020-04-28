import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call} from "redux-saga/effects";

function* loginMiddleware(action) {
    yield localStorage.setItem('sid', action.data);
    yield localStorage.setItem('isLogin', 'true');
    yield put({type: ActionType.SET_IS_LOGIN});

}

function* watchLogin() {
    const reqChan = yield actionChannel(ActionType.SET_SESSION);

    while(true) {
        try {
            const action = yield take(reqChan);

            yield call(loginMiddleware, action);
        } catch (e) {

        }
    }
}

export default watchLogin;
