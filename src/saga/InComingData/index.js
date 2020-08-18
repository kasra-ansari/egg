import {take, actionChannel, put, fork, all, call} from "redux-saga/effects";
import * as ActionType from "../../redux/app/actions/constants";
import notificationCenter from "../../helper/notificationCenter";

function* inComingDelivery(action) {
    const payload = action.data;
    const type = action.data.title;
    const extractor = {
        'user_info': function* () {
            yield put({type: ActionType.USER_INFO, data: payload})
        },
        'status': function* () {
            yield put({type: ActionType.SET_STATUS, data: payload.data})
        },
        'buying_power': function* () {
            yield put({type: ActionType.SET_BUYING_POWER, data: payload.data});
        },
        'time': function* () {
            yield put({type: ActionType.SET_TIME, data: payload.data})
        },
        'orderbook': function* () {
            yield put({type: ActionType.ORDER_BOOK, data: payload.data})
        },
        'reconnect_data': function* () {
            yield all([
                put({type: ActionType.LINKER_REQUEST, data: payload.linkers, title: 'reconnect'}),
                put({type: ActionType.ORDER_REQUEST, data: payload.orders, title: 'reconnect'})
            ])
        },
        'insert_order': function* () {
            yield put({type: ActionType.ORDER_REQUEST, data: payload.data, title: 'insert'});
        },
        'finish_order': function* () {
            yield put({type: ActionType.ORDER_REQUEST, data: payload.data, title: 'finish'});
        },
        'update_order': function* () {
            yield put({type: ActionType.ORDER_REQUEST, data: payload.data, title: 'update'});
        },
        'partially_order': function* () {
            yield put({type: ActionType.ORDER_REQUEST, data: payload.data, title: 'partially'});
        },
        'remove_order': function* () {
            yield put({type: ActionType.ORDER_REQUEST, data: payload.data, title: 'remove'});
        },
        'available_shares': function* () {
            yield put({type: ActionType.AVAILABLE_SHARE, data: payload.data});
        },
        'share_informations': function* () {
            yield put({type: ActionType.SHARES_INFO, data: payload.data});
        },
        'share_info': function* () {
            yield put({type: ActionType.UPDATE_SHARE_INFO, data: payload.data})
        },
        'add_linker': function* () {
            yield put({type: ActionType.LINKER_REQUEST, data: payload.data, title: 'insert'});
            yield put({type: ActionType.NOTIFICATION_BAR, data: {msg: `استراتژی ${payload.data.name} با موفقیت ثبت شد`, color: '#52CC14'}})
        },
        'start_linker': function* () {
            yield put({type: ActionType.LINKER_REQUEST, data: payload.data, title: 'start'});
            yield put({type: ActionType.NOTIFICATION_BAR, data: {msg: `استراتژی ${payload.data.name} با موفقیت اجرا شد`, color: '#52CC14'}})
        },
        'finish_linker': function* () {
            yield put({type: ActionType.LINKER_REQUEST, data: payload.data, title: 'finish'});
        },
        'stop_linker': function* () {
            yield put({type: ActionType.LINKER_REQUEST, data: payload.data, title: 'stop'});
            yield put({type: ActionType.NOTIFICATION_BAR, data: {msg: `استراتژی ${payload.data.name} ${payload.data.reason_text}`, color: '#E53939'}})
        },
        'error_linker': function* () {
            yield put({type: ActionType.LINKER_REQUEST, data: payload.data, title: 'error'});
            yield put({type: ActionType.NOTIFICATION_BAR, data: {msg: `استراتژی ${payload.data.name} ${payload.data.reason_text}`, color: '#E53939'}})
        },
        'finish_resource': function* () {
            yield put({type: ActionType.RESOURCE_REQUEST, data: payload.data});
        },
        'update_resource': function* () {
            yield put({type: ActionType.RESOURCE_REQUEST, data: payload.data});
        },
        'stop_resource': function* () {
            yield put({type: ActionType.RESOURCE_REQUEST, data: payload.data});
        },
        'stop_resource_failed': function* () {
            yield put({type: ActionType.RESOURCE_REQUEST, data: payload.data});
        },
        'strategies_info': function* () {
            yield put({type: ActionType.STRATEGIES_INFO, data: payload.data});
        },
        'notification': function* () {
            // yield call(notificationCenter, payload.data)
            yield put({type: ActionType.NOTIFICATION_BAR, data: payload.data})
        },
        'error': function* () {
            yield call(notificationCenter, payload.data)
            yield put({type: ActionType.NOTIFICATION_BAR, data: {...payload.data, color: '#E53939'}})
        },
        'candle': function* () {
            yield put({type: ActionType.CANDLE_REQUEST, data: payload.data, title: 'set'});
        },
        'update_candle': function* () {
            yield put({type: ActionType.CANDLE_REQUEST, data: payload.data, title: 'update'});
        },
        'share_status_changed': function* () {
            yield put({type: ActionType.SHARE_STATUS_CHANGE, data: payload.data});
        },
        'settings': function* () {
            yield put({type: ActionType.SETTING_REQUEST, data: payload.data});
        },
        'edit_linker_parameters': function* () {
            yield put({type: ActionType.SET_EDIT_LINKER_PARAMETERS, data: payload.data});
        },
        'default': function* () {
            yield null
        }
    };

    return yield (extractor[type] || extractor['default'])();
}

function* watchInComingData() {
    const reqChan = yield actionChannel(ActionType.INCOMING_DATA);

    while (true) {
        try {
            const action = yield take(reqChan);

            yield fork(inComingDelivery, action);
        } catch (e) {
            console.log("INCOME CATCH", e)
        }
    }
}

export default watchInComingData;
