import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call} from "redux-saga/effects";

function* settingMiddleware(action) {
    const array = [];
    //eslint-disable-next-line
    Object.keys(action.data).length > 0 && Object.keys(action.data).map(key => {
        if (Object.keys(action.data[key]).length > 0) {
            const obj = {
                key: key,
                ...action.data[key]
            };

            array.push(obj);
        }
    });

    yield put({type: ActionType.SET_SETTING_REQUEST, data: array});
}

function* watchSettings() {
    const reqChan = yield actionChannel(ActionType.SETTING_REQUEST);

    while(true) {
        try {
            const action = yield take(reqChan);

            yield call(settingMiddleware, action);
        } catch (e) {
            console.log(e)
        }
    }
}

export default watchSettings;
