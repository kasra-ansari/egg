import {applyMiddleware, compose, createStore} from "redux";
import {createLogger} from "redux-logger";
import rootReducer from "../reducers";
// import {loadSid} from './localStorage';
import createSagaMiddleware from "redux-saga";
import rootSaga from "../../saga";

const loggerOption = {
    predicate(getState, action) {
        if (action.type === 'SET_ORDER_BOOK' || action.type === "ORDER_BOOK") return false;
        return true
    }
}
const logger = createLogger(loggerOption);
const persistedState = {
    // ...loadState(),
    // sid: loadSid()
};

const sagaMiddleware = createSagaMiddleware();

let enhancer;

if (process.env.NODE_ENV !== 'production') {
    enhancer = compose(
        applyMiddleware(
            logger,
            sagaMiddleware
        )
    )

} else {
    enhancer = compose(
        applyMiddleware(sagaMiddleware)
    )
}


let store = createStore(
    rootReducer,
    persistedState,
    enhancer
);

if (module.hot) {
    module.hot
        .accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        })
}

sagaMiddleware.run(rootSaga)

// store.subscribe(() => {
//     // saveSid(store.getState().sid)
//     // saveState(store.getState())
// });


export default store;
