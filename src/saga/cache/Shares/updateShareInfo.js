import * as ActionType from "../../redux/app/actions/constants";
import {put, take, actionChannel, fork, select} from "redux-saga/effects";
import {updatedDiff} from "deep-object-diff";

function* updateShareMiddleware(action) {
    const state = yield select();
    let shareInfoState = state.app.shareInformation;
    let portfolio = state.app.portfolio;

    const updatedShareInfo = updatedDiff(shareInfoState[action.data.instrument_id], action.data);

    if (Object.keys(updatedShareInfo).length > 0) {
        shareInfoState[action.data.instrument_id] = {
            ...shareInfoState[action.data.instrument_id],
            ...updatedShareInfo
        };

        yield put({type: ActionType.SET_UPDATE_SHARE_INFO, data: shareInfoState})
    }


    const portfoIndex = portfolio.findIndex(v => v.instrument_id === action.data.instrument_id);

    if (portfoIndex > -1) {
        const updated = updatedDiff(portfolio[portfoIndex], action.data);
        if (Object.keys(updated).length > 0) {
            portfolio[portfoIndex] = {
                ...portfolio[portfoIndex],
                ...updated
            };

            yield put({type: ActionType.UPDATE_USER_PORTFOLIO, data: portfolio});
        }

    }

}


function* watchUpdateShare() {
    const reqChan = yield actionChannel(ActionType.UPDATE_SHARE_INFO)

    while (true) {
        try {
            const action = yield take(reqChan);

            yield fork(updateShareMiddleware, action);
        } catch (e) {

        }
    }
}


export default watchUpdateShare;
