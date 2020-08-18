import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call} from "redux-saga/effects";

function* strategiesMiddleware(action) {
    let data = {};
    //eslint-disable-next-line
    action.data.length > 0 && action.data.map(item => {
        data = {
            types: {
                ...data.types,
                [item.type.id]: item.type
            },
            general: {
                ...data.general,
                [item.type.id]: item.general
            },
            specific: {
                ...data.specific,
                [item.type.id]: item.specific2
            },
            sides: {
                ...data.sides,
                [item.type.id]: item.sides
            }
        };
    });

    yield put({type: ActionType.SET_STRATEGIES_INFO, data: {...data}});
}

function* watchStrategies() {
    const reqChan = yield actionChannel(ActionType.STRATEGIES_INFO);

    while(true) {
        try {
            const action = yield take(reqChan);

            yield call(strategiesMiddleware, action);

        } catch (e) {
            console.log(e)
        }
    }
}


export default watchStrategies;
