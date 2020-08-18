import * as ActionType from "../../redux/app/actions/constants";
import {put, take, fork} from "redux-saga/effects";

function* loadingMiddleware(key) {
    yield put({type: ActionType.SET_APP_LOADING, data: key});
}

function* AppLoading() {
    while(true) {
        try {
            yield take(ActionType.AVAILABLE_SHARE);
            yield fork(loadingMiddleware, 'availableShare');

            yield take(ActionType.SHARES_INFO);
            yield fork(loadingMiddleware, 'shareInformations');

            yield take(ActionType.LINKER_REQUEST);
            yield fork(loadingMiddleware, 'linkerData');

            yield take(ActionType.ORDER_REQUEST);
            yield fork(loadingMiddleware, 'orderData');;

            yield take(ActionType.USER_INFO);
            yield fork(loadingMiddleware, 'userInfo');
            
            yield take(ActionType.ORDER_BOOK);
            yield fork(loadingMiddleware, 'orderBook');

        } catch (e) {
            console.log(e)
        }
    }
}

export default AppLoading;
