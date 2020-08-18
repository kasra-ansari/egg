import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call, select} from "redux-saga/effects";

export const aggregator = (section, state) => {

    let aggregated = [];
    // eslint-disable-next-line
    Object.keys(section).length > 0 && Object.keys(section).map(key => {
        if (state.app.selected_instrument === section[key].instrument_id) {

            const {side} = section[key];
            const countsProperty = side === 'B' ? 'counts_buy' : 'counts_sell';
            const volProperty = side === 'B' ? 'vol_buy' : 'vol_sell';
            const priceProperty = side === 'B' ? 'price_buy' : 'price_sell';

            section[key] = {
                ...section[key],
                [countsProperty]: 1,
                [volProperty]: section[key].volume,
                [priceProperty]: section[key].price,
                //VISIBILITY ON ORDER_BOOK
                existPrice: -1
            };

            const existPriceIndex = aggregated.findIndex(b => b.price === section[key].price);

            if (existPriceIndex > -1) {
                aggregated[existPriceIndex] = {
                    ...aggregated[existPriceIndex],
                    [countsProperty]: aggregated[existPriceIndex][countsProperty] + 1,
                    [volProperty]: aggregated[existPriceIndex][volProperty] + section[key][volProperty]
                }
            } else {
                aggregated.push(section[key])
            }
        }
    });

    //eslint-disable-next-line
    aggregated.sort((a, b) => {
        if (a.side === 'B' && b.side === 'B') {
            return b.price - a.price
        } else if (a.side === 'S' && b.side === 'S') {
            return a.price - b.price
        }
    });

    return aggregated;

}

function* orderInBookMiddleware(action) {
    try {
        const state = yield select();
        const buyAggregate = yield call(aggregator, action.data.buy, state);
        const sellAggregate = yield call(aggregator, action.data.sell, state)

        yield put({type: ActionType.SET_ORDER_BOOK_ORDERS, data: {buy: buyAggregate, sell: sellAggregate}});
    }
     catch (e) {
        console.log(e)
    }

}


function* watchOrderInOrderBook() {
    const reqChan = yield actionChannel(ActionType.SET_QUEUED_ORDER);
    while (true) {
        try {
            const action = yield take(reqChan);

            yield call(orderInBookMiddleware, action)

        } catch (e) {
            console.log(e)
        }
    }
}


export default watchOrderInOrderBook
