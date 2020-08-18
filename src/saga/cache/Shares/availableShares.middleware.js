import * as ActionType from "../../redux/app/actions/constants";
import {take, put, spawn} from "redux-saga/effects";

function* availableSharesMiddleware(action) {
    const obj = {};
    if (action.data.length > 0) {
        //eslint-disable-next-line
        action.data.map(item => {
            obj[item.instrument_id] = item
        })
    }
    yield put({type: ActionType.SET_AVAILABLE_SHARE, data: obj});
}

function* watchAvailableShare() {
    while(true) {
        try {
            const action = yield take(ActionType.AVAILABLE_SHARE);
            if (action)
                yield spawn(availableSharesMiddleware, action);

        } catch (e) {
            console.log(e)
        }
    }
}


export default watchAvailableShare;
