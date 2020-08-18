import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call, select} from "redux-saga/effects";
import calculateAggregation from "../../helper/aggregateClcHelper";

function* tradeMiddleware(action) {
    const state = yield select();
    const orders = [...Object.values(action.data.buy), ...Object.values(action.data.sell)];

    const calc = yield call(calculateAggregation, orders, state);
    yield put({type: ActionType.SET_CALC_TRADE, data: calc});
}

function* watchFinishOrder() {
    const reqChan = yield actionChannel(ActionType.SET_FINISH_ORDER);

    while (true) {
        try {
            const action = yield take(reqChan);

            yield call(tradeMiddleware, action)
        } catch (e) {
            console.log(e)
        }
    }
}

export default watchFinishOrder;
