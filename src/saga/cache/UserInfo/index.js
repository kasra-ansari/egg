import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, spawn, call, select} from "redux-saga/effects";
import RequestService from "../../services/requests";

function* UserInfoPortfolio(action) {
    const state = yield select();
    const shareInformation = state.app.shareInformation;
    let arr = [];
    const subscribe = [];
    for (let [key ,value] of Object.entries(action.data.portfolio)) {
        subscribe.push(key);
        if (shareInformation[key]) {
            const obj = {
                ...shareInformation[key],
                owner_value: value
            }

            arr.push(obj);
        }
    }

    yield put({type: ActionType.SET_USER_INFO, data: action.data});
    yield put({type: ActionType.SET_USER_PORTFOLIO, data: arr});
    if (subscribe.length > 0)
        yield call(RequestService.subscribeInstrumentsList, subscribe);
}

function* watchUserInfo() {
    const reqChan = yield actionChannel(ActionType.USER_INFO);

    while (true) {
        try {
            const action = yield take(reqChan);

            yield call(UserInfoPortfolio, action)

            yield spawn(RequestService.selectShare);

            yield spawn(RequestService.getWatchListNames)
        } catch (e) {
            console.log(e)
        }
    }
}


export default watchUserInfo;
