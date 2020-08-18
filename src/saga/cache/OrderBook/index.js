import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call} from "redux-saga/effects";

function* orderBookMiddleware(action) {
    let newData = [];
    let obj = {};
    const {data} = action;
    for (let i = 0; i < (data.counts_buy || []).length; ++i) {
        obj = {
            key: `${i}`,
            counts_buy: data.counts_buy[i],
            counts_sell: data.counts_sell[i],
            price_buy: data.price_buy[i],
            price_sell: data.price_sell[i],
            vol_buy: data.vol_buy[i],
            vol_sell: data.vol_sell[i],
            //FOR ORDER SIGN
            hasOrder: false,
            orderSide: ''
        };

        newData.push(obj);
    }
    yield put({type: ActionType.SET_ORDER_BOOK, data: {data: newData, instrument_id: data.instrument_id, original: data}})
}

function* watchOrderBook() {
    const reqChan = yield actionChannel(ActionType.ORDER_BOOK);

    while (true) {
        try {
            const action = yield take(reqChan);

            yield call(orderBookMiddleware, action)
        } catch (e) {
            console.log(e)
        }


    }
}

export default watchOrderBook
