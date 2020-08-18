import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call, select} from "redux-saga/effects";

function* resourcesMiddleware(action) {
    const state = yield select();
    let linkerState = state.app.linkers;

    linkerState = {
        ...linkerState,
        [action.data.linker_id]: {
            ...linkerState[action.data.linker_id],
            resources: {
                ...linkerState[action.data.linker_id].resources,
                [action.data.instrument_id]: {
                    ...linkerState[action.data.linker_id].resources[action.data.instrument_id],
                    info: {
                        ...linkerState[action.data.linker_id].resources[action.data.instrument_id].info,
                        ...action.data
                    }
                }
            }
        }
    };

    yield put({type: ActionType.SET_RESOURCE_REQUEST, data: linkerState})
}

function* watchResources() {
    const reqChan = yield actionChannel(ActionType.RESOURCE_REQUEST);

    while (true) {
        try {
            const action = yield take(reqChan);

            yield call(resourcesMiddleware, action);
        } catch (e) {
            console.log(e)
        }
    }
}

export default watchResources;
