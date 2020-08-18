import * as ActionType from "../../redux/app/actions/constants";
import {take, actionChannel, call} from "redux-saga/effects";
import orderReportMiddleware from "./middleware/orderReportFromLinkers";

function* watchLinkerResourceForOrderReport() {
    const reqChan = yield actionChannel(ActionType.SET_RESOURCE_REQUEST);

    while (true) {
        try {
            const action = yield take(reqChan);

            yield call(orderReportMiddleware, action);
        } catch (e) {

        }
    }
}

export default watchLinkerResourceForOrderReport;
