import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call, select} from "redux-saga/effects";

function* notificationMiddleware(action) {
    const store = yield select();
    console.log(action, store.notification)

    let notifData = store.notification || [];
    if (action.data.hasOwnProperty('type')) {

        const data = {
            msg: action.data.message,
            color: action.data.color,
            time: `${new Date().toLocaleTimeString()}`
        };

        notifData = [data, ...notifData]
        // notifData = [data, ...store.notification].splice(0,50);

    } else {
        notifData = [action.data, ...notifData]
        // notifData = [action.data, ...store.notification].splice(0, 50)

    }

    const splicedData = notifData.splice(0, 50)

    yield put({type: ActionType.SET_NOTIFICATION_BAR, data: splicedData});

    // yield fork(localStorage.setItem, 'notifications', JSON.stringify(notifData))
    yield localStorage.setItem('notifications', JSON.stringify(splicedData));


}


function* watchNotification() {
    const reqChan = yield actionChannel(ActionType.NOTIFICATION_BAR);

    while (true) {
        try {
            const action = yield take(reqChan);

            yield call(notificationMiddleware, action)

        } catch (e) {
            console.log(e)
        }
    }
}

export default watchNotification;
