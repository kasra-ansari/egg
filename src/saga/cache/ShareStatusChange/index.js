import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call, select} from "redux-saga/effects";

function* shareStatusChangeMiddleware(action) {
    const store = yield select();
    let shareStatusChange = store.app.shareInformation[action.data.instrument_id];

    if (shareStatusChange) {
        shareStatusChange = {
            ...shareStatusChange,
            ...action.data
        };

        const obj = {
            [action.data.instrument_id]: shareStatusChange
        };

        // yield call(notificationCenter, {
        //     message: `${shareStatusChange.symbol} - ${action.data.status_name}`,
        //     description: `نماد ${shareStatusChange.symbol} ${action.data.status_name} است`
        // }, 'info', 'bottomLeft')

        yield put({type: ActionType.NOTIFICATION_BAR,
            data: {
                msg: `${shareStatusChange.symbol} - ${action.data.status_name}`,
                color: 'darkgray',
                time: `${new Date().toLocaleTimeString()}`
            }
        })
        yield put({type: ActionType.SET_SHARE_STATUS_CHANGE, data: obj});

    }


}


function* watchShareStatusChange() {
    const reqChan = yield actionChannel(ActionType.SHARE_STATUS_CHANGE);

    while (true) {
        try {
            const action = yield take(reqChan);

            yield call(shareStatusChangeMiddleware, action)

        } catch (e) {
            console.log(e)
        }
    }
}

export default watchShareStatusChange;
