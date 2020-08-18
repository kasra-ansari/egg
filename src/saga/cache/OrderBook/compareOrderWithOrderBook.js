import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call, select, spawn, all} from "redux-saga/effects";
import {updatedDiff} from "deep-object-diff";
import {iterator, orderBookEffect} from "./compareOrderBookWithOrder";


function* compare(action) {
    const state = yield select();
    const {original} = state.app.orderBook;
    // console.log(action, state)
    if (Object.keys(original).length > 0) {
        const buyEffect = yield call(iterator, action.data.buy, original);
        const sellEffect = yield call(iterator, action.data.sell, original);

        const comparedBuy = yield call(updatedDiff, action.data.buy, buyEffect);
        const compareSell = yield call(updatedDiff, action.data.sell, sellEffect);

        if (Object.keys(comparedBuy).length > 0 || Object.keys(compareSell).length > 0) {
            yield put({type: ActionType.SET_ORDER_BOOK_ORDERS_VISIBILITY, data: {buy: buyEffect, sell: sellEffect}});
        }

        yield all([
            spawn(orderBookEffect, buyEffect, state),
            spawn(orderBookEffect, sellEffect, state)
        ])
    }
}


function* compareOrderWithOrderBook() {
    const orderInOrderBookChan = yield actionChannel(ActionType.SET_ORDER_BOOK_ORDERS);

    while(true) {
        try {
            const orderInOrderBookAction = yield take(orderInOrderBookChan);

            yield call(compare, orderInOrderBookAction);

            // const orderBookAction = yield take(orderBookChan);
        } catch (e) {
            console.log(e)
        }
    }

}

export default compareOrderWithOrderBook;
