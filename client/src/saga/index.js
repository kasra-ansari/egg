import {all, spawn, fork} from "redux-saga/effects";
import watchLogin from "./Login";

function* watchAll() {
    yield all([
        // fork(watchLogin),
    ])
}

export default watchAll
