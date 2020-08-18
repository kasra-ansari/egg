import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call, select} from "redux-saga/effects";

function* candleMiddleware(action) {
    console.log("action", action);
    if (action.title === 'set' && action.data.candle.length > 0) {
        const ohlc = [], volume = [];
        //eslint-disable-next-line
        action.data.candle.map(item => {
            if (item.open !== 0) {
                const date = new Date(item.date_time).getTime();
                ohlc.push([date, item.open, item.high, item.low, item.close]);
                volume.push([date, item.volume]);
            }

        });
        const obj = {
            [action.data.instrument_id]: {
                ohlc: ohlc,
                volume: volume
            }
        };

        yield put({type: ActionType.SET_CANDLE, data: obj})
    }

    if (action.title === 'update' && Object.keys(action.data).length > 0) {
        const store = yield select();
        let candleExist = store.app.candle[action.data.instrument_id]
        if (candleExist && action.data.open !== 0) {
            const date = new Date(action.data.date_time).getTime();
            const ohlc = [date, action.data.open, action.data.high, action.data.low, action.data.close];
            const volume = [date, action.data.volume];
            const obj = {
                [action.data.instrument_id]: {
                    ohlc: [...candleExist.ohlc, ohlc],
                    volume: [...candleExist.volume, volume]
                }
            };
            console.log("CANDLE MIDDLEWARWE", volume)

            yield put({type: ActionType.SET_CANDLE, data: obj})
        }
    }

}

function* watchCandle() {
    const reqChan = yield actionChannel(ActionType.CANDLE_REQUEST);

    while(true) {
        try {
            const action = yield take(reqChan);

            yield call(candleMiddleware, action);
        } catch (e) {
            console.log(e)
        }
    }
}

export default watchCandle;
