import {all} from "redux-saga/effects";

function* watchAll() {
    yield all([
        // fork(connect),
        // spawn(watchInComingData),

        // spawn(watchAvailableShare),
        // spawn(watchShareInfo),
        // spawn(watchUpdateShare),

        // spawn(watchOrderBook),
        // spawn(watchOrderInOrderBook),
        // spawn(compareOrderWithOrderBook),
        // spawn(compareOrderBookWithOrder),
        // spawn(watchInstrumentChangeOrderBook),

        // spawn(watchLinkers),
        // spawn(watchResources),

        // spawn(watchOrderReport),
        // spawn(watchLinkerResourceForOrderReport),

        // spawn(watchOrders),
        // spawn(watchFinishOrder),
        // spawn(watchQueuedOrder),

        // spawn(watchStrategies),

        // spawn(watchUserInfo),

        // spawn(watchCandle),
        // spawn(watchShareStatusChange),
        // spawn(watchSettings),

        // spawn(watchNotification),

        // spawn(AppLoading),

        // fork(watchLogin),
        // fork(watchLogout),
    ])
}

export default watchAll
