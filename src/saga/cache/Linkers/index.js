import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, call, select, spawn} from "redux-saga/effects";
import RequestService from "../../services/requests";

function* linkerMiddleware(action) {
    switch (action.title) {
        case 'insert':
        case 'start':
        case 'finish':
        case 'error':
        case 'stop': {
            const state = yield select();
            const newData = {
                ...state.app.linkers,
                [action.data.linker_id]: action.data
            };

            yield put({type: ActionType.SET_LINKER_REQUEST, data: newData});

            if (action.title === 'insert' && state.app.autoStartLinkerId.length > 0 && action.data.linker_id === state.app.autoStartLinkerId) {
                yield spawn(RequestService.startLinker, action.data.linker_id);
                yield put({type: ActionType.REMOVE_STARTED_LINKER_AUTO});
            }
            break;
        }

        case 'reconnect': {
            console.log("reconnect", action)
            if (Object.keys(action.data).length > 0) {
                yield put({type: ActionType.SET_LINKER_REQUEST, data: action.data})
            }
            break;
        }

        default:
    }
}

function* watchLinkers() {
    const reqChan = yield actionChannel(ActionType.LINKER_REQUEST);
    while (true) {
        try {
            const action = yield take(reqChan);

            yield call(linkerMiddleware, action);

        } catch (e) {
            console.log(e)
        }
    }
}

export default watchLinkers;
