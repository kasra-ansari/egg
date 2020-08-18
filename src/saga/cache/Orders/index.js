import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call, select, all} from "redux-saga/effects";

function* ordersMiddleware(action) {
    switch (action.title) {
        case 'insert':
        case 'partially':
        case 'update': {
            const state = yield select();
            const queuedOrder = state.app.queuedOrder;
            const finishedOrder = state.app.finishedOrder;
            if (action.data.status === 'queued') {

                if (action.data.side === 'B') {
                    queuedOrder.buy[action.data.order_id] = action.data;

                } else {
                    queuedOrder.sell[action.data.order_id] = action.data;

                }

                yield put({type: ActionType.SET_QUEUED_ORDER, data: queuedOrder});

                if (action.data.executed_volume > 0) {

                    if (action.data.side === 'B') {
                        finishedOrder.buy[action.data.order_id] = action.data

                    } else {
                        finishedOrder.sell[action.data.order_id] = action.data

                    }

                    yield put({type: ActionType.SET_FINISH_ORDER, data: finishedOrder});
                }
            }


            break;
        }
        case 'finish': {
            const state = yield select();
            let queuedState = state.app.queuedOrder;
            let finishedState = state.app.finishedOrder;

            if (action.data.side === 'B' && queuedState.buy.hasOwnProperty(action.data.order_id)) {
                yield delete queuedState.buy[action.data.order_id];
                yield put({type: ActionType.SET_QUEUED_ORDER, data: queuedState});

                finishedState.buy[action.data.order_id] = action.data;

                yield put({type: ActionType.SET_FINISH_ORDER, data: finishedState});

            } else if (action.data.side === 'S' && queuedState.sell.hasOwnProperty(action.data.order_id)) {
                yield delete queuedState.sell[action.data.order_id];
                yield put({type: ActionType.SET_QUEUED_ORDER, data: queuedState});

                finishedState.sell[action.data.order_id] = action.data;

                yield put({type: ActionType.SET_FINISH_ORDER, data: finishedState});
            }

            break;
        }

        case 'remove': {
            const state = yield select();
            const queuedState = state.app.queuedOrder;
            if (action.data.side === 'B' && queuedState.buy.hasOwnProperty(action.data.order_id)) {
                yield delete queuedState.buy[action.data.order_id];
                yield put({type: ActionType.SET_QUEUED_ORDER, data: queuedState})

            } else if (action.data.side === 'S' && queuedState.sell.hasOwnProperty(action.data.order_id)) {
                yield delete queuedState.sell[action.data.order_id];
                yield put({type: ActionType.SET_QUEUED_ORDER, data: queuedState})
            }

            break;
        }

        case 'reconnect': {
            let finished = {buy: {}, sell: {}}, queued = {buy: {}, sell: {}};

            for (let i=0; i < Object.keys(action.data).length; ++i) {
                const key = Object.keys(action.data)[i];

                switch (action.data[key].status) {
                    case 'finished': {
                        if (action.data[key].side === 'B') {
                            finished.buy[key] = action.data[key];
                        } else {
                            finished.sell[key] = action.data[key];
                        }
                        break;
                    }
                    case 'queued': {
                        if (action.data[key].side === 'B') {
                            queued.buy[key] = action.data[key];
                            if (action.data[key].executed_volume > 0) {
                                finished.buy[key] = action.data[key];
                            }
                        } else if (action.data[key].side === 'S') {
                            queued.sell[key] = action.data[key];
                            if (action.data[key].executed_volume > 0) {
                                finished.sell[key] = action.data[key];
                            }
                        }
                        break;
                    }

                    case 'removed': {
                        if (action.data[key].executed_volume > 0) {
                            if (action.data[key].side === 'B') {
                                finished.buy[key] = action.data[key];
                            } else {
                                finished.sell[key] = action.data[key];
                            }
                        }
                        break;
                    }

                    default:
                }
            }

            yield all([
                put({type: ActionType.SET_FINISH_ORDER, data: finished}),
                put({type: ActionType.SET_QUEUED_ORDER, data: queued})
            ]);

            break;
        }

        default: {
            return null
        }
    }
}

function* watchOrders() {
    const reqChan = yield actionChannel(ActionType.ORDER_REQUEST);

    while (true) {
        try {
            const action = yield take(reqChan);
            yield call(ordersMiddleware, action);
        } catch (e) {
            console.log(e)
        }
    }
}

export default watchOrders
