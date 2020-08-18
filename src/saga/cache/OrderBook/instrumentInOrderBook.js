import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call, select} from "redux-saga/effects";
import {aggregator} from "./orderInOrderBook";

function* instrumentChangeMiddleware() {
    try {
        const state = yield select();

        const buyAggregate = yield call(aggregator, state.app.queuedOrder.buy, state);
        const sellAggregate = yield call(aggregator, state.app.queuedOrder.sell, state);

        yield put({type: ActionType.SET_ORDER_BOOK_ORDERS, data: {buy: buyAggregate, sell: sellAggregate}});

    } catch (e) {

    }
}

function* watchInstrumentChangeOrderBook() {
    const reqChan = yield actionChannel(ActionType.SET_SELECTED_INSTRUMENT);

    while(true) {
        try {
            yield take(reqChan);

            yield call(instrumentChangeMiddleware);
        } catch (e) {
            console.log(e)
        }
    }
}

export default watchInstrumentChangeOrderBook;
