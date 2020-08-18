import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call, select, spawn, all} from "redux-saga/effects";
import {updatedDiff} from "deep-object-diff";

export const iterator = (data, original) => {
    let newData = [];
    //eslint-disable-next-line
    data.length > 0 && data.map(item => {
        const property = item.side === 'B' ? 'price_buy' : 'price_sell';
        const existInOrderBook = original[property].findIndex(p => p === item.price);
        let newItem = {
            ...item,
            existPrice: existInOrderBook
        };

        newData.push(newItem);
    });

    return newData;
};

export function* orderBookEffect(effect, state) {
    let orderBookData = state.app.orderBook.data;
    let doIt = false;
    //eslint-disable-next-line
    effect.length > 0 && effect.map(item => {
        if (item.existPrice > -1) {
            doIt = true;
            orderBookData[item.existPrice] = {
                ...orderBookData[item.existPrice],
                hasOrder: true,
                orderSide: item.side
            }
        }
    });

    if (doIt)
        yield put({type: ActionType.UPDATE_ORDER_BOOK_HAS_ORDER, data: orderBookData})
}

function* compare(action) {
    const state = yield select();
    const {orders} = state.app.orderBook;

    if (orders.buy.length > 0 || orders.sell.length > 0) {
        const buyEffect = yield call(iterator, orders.buy, action.data.original);
        const sellEffect = yield call(iterator, orders.sell, action.data.original);

        const comparedBuy = yield call(updatedDiff, orders.buy, buyEffect);
        const comparedSell = yield call(updatedDiff, orders.sell, sellEffect);

        if (Object.keys(comparedBuy).length > 0 || Object.keys(comparedSell).length > 0) {
            yield put({type: ActionType.SET_ORDER_BOOK_ORDERS_VISIBILITY, data: {buy: buyEffect, sell: sellEffect}});
        }

        yield all([
            spawn(orderBookEffect, buyEffect, state),
            spawn(orderBookEffect, sellEffect, state)
        ])
    }
}

function* compareOrderBookWithOrder() {
    const orderBookChan = yield actionChannel(ActionType.SET_ORDER_BOOK);

    while (true) {
        try {
            const action = yield take(orderBookChan);

            yield call(compare, action);

        } catch (e) {
            console.log(e)
        }
    }
}

export default compareOrderBookWithOrder;
