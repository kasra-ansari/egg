import {select, put, take, spawn} from "redux-saga/effects";
import * as ActionType from "../../redux/app/actions/constants";

function* shareInfoMiddleware(action) {
    const state = yield select();
    let shareInfoState = state.app.shareInformation;

    for (let i=0; i < action.data.length; ++i) {
        shareInfoState[action.data[i].instrument_id] = {
            ...shareInfoState[action.data[i].instrument_id],
            ...action.data[i]
        }
    }

    //eslint-disable-next-line
    // action.data.length > 0 && action.data.map(item => {
    //    shareInfoState = {
    //        ...shareInfoState,
    //        [item.instrument_id]: {
    //            ...shareInfoState[item.instrument_id],
    //            ...item
    //        }
    //    }
    // });

    yield put({type: ActionType.SET_SHARES_INFO, data: shareInfoState})
}

function* watchShareInfo() {
    while (true) {
        try {
            const action = yield take(ActionType.SHARES_INFO)

            yield spawn(shareInfoMiddleware, action);


        } catch (e) {
            console.log(e)
        }
    }
}


export default watchShareInfo;
