import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call, select} from "redux-saga/effects";
import calculateAggregation from "../../helper/aggregateClcHelper";

function* orderMiddleware(action) {
    const state = yield select();
    const orders = [...Object.values(action.data.buy), ...Object.values(action.data.sell)];

    const calc = yield call(calculateAggregation, orders, state, 'order');
    yield put({type: ActionType.SET_CALC_ORDER, data: calc});
}

function* watchQueuedOrder() {
    const reqChan = yield actionChannel(ActionType.SET_QUEUED_ORDER);

    while (true) {
        try {
            const action = yield take(reqChan);

            yield call(orderMiddleware, action);
        } catch (e) {
            console.log(e)
        }
    }
}


export default watchQueuedOrder;
