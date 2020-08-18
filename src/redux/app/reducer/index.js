import {handleActions} from 'redux-actions';
import * as Actions from '../actions/constants';

const initialState = {
    user: {},
    shareInformation: {},
    status: {},
    time: '',
    orderBook: {
        data: [],
        instrument_id: '',
        original: {},
        orders: {
            buy: [],
            sell: []
        }
    },
    token: '',
    queuedOrder: {
        buy: {},
        sell: {}
    },
    finishedOrder: {
        buy: {},
        sell: {}
    },
    selected_instrument: '',
    linkers: {},
    aggregate: {
        trade: {
            byLinker: {},
            byInstrument: {}
        },
        order: {
            byLinker: {},
            byInstrument: {}
        }
    },
    strategies: {},
    autoStartLinkerId: '',
    isLogin: !!localStorage.getItem('isLogin') && localStorage.getItem('isLogin') === 'true',
    portfolio: [],
    watchList: [],
    candle: {},
    settings: [],
    orderReport: {
        byLinker: {},
        byInstrument: {}
    },

    //THIS IS FLAG FOR STOCKS/ORDER PAGE [CHECK FOR NOT DIRECT URL]
    orderTrueWay: false
};

export const AppReducers = handleActions({
    [Actions.SET_ORDER_REPORT]: (state, action) => (
        {
            ...state,
            orderReport: action.data
        }
    ),
    //User
    [Actions.SET_USER_INFO]: (state, action) => (
        {
            ...state,
            user: action.data
        }
    ),

    [Actions.SET_USER_PORTFOLIO]: (state, action) => (
        {
            ...state,
            portfolio: action.data
        }
    ),

    [Actions.UPDATE_USER_PORTFOLIO]: (state, action) => (
        {
            ...state,
            portfolio: action.data
        }
    ),

    [Actions.SET_WATCH_LIST]: (state, action) => (
        {
            ...state,
            watchList: action.data
        }
    ),

    //Shares
    [Actions.SET_AVAILABLE_SHARE]: (state, action) => (
        {
            ...state,
            shareInformation: action.data
        }
    ),

    [Actions.SET_SHARES_INFO]: (state, action) => (
        {
            ...state,
            shareInformation: action.data
        }
    ),

    [Actions.SET_UPDATE_SHARE_INFO]: (state, action) => (
        {
            ...state,
            shareInformation: action.data
        }
    ),

    [Actions.SET_SHARE_STATUS_CHANGE]: (state, action) => (
        {
            ...state,
            shareInformation: {
                ...state.shareInformation,
                ...action.data
            }
        }
    ),

    //Status
    [Actions.SET_STATUS]: (state, action) => (
        {
            ...state,
            status: {
                ...state.status,
                ...action.data
            }
        }
    ),

    //Buying power
    [Actions.SET_BUYING_POWER]: (state, action) => (
        {
            ...state,
            user: {
                ...state.user,
                buying_power: action.data
            }
        }
    ),

    //Time
    [Actions.SET_TIME]: (state, action) => (
        {
            ...state,
            time: action.data
        }
    ),

    //Order book
    [Actions.SET_ORDER_BOOK]: (state, action) => (
        {
            ...state,
            orderBook: {
                ...state.orderBook,
                ...action.data
            }
        }
    ),

    [Actions.SET_ORDER_BOOK_ORDERS]: (state, action) => (
        {
            ...state,
            orderBook: {
                ...state.orderBook,
                orders: action.data
            }
        }
    ),

    [Actions.SET_ORDER_BOOK_ORDERS_VISIBILITY]: (state, action) => (
        {
            ...state,
            orderBook: {
                ...state.orderBook,
                orders: action.data
            }
        }
    ),

    [Actions.UPDATE_ORDER_BOOK_HAS_ORDER]: (state, action) => (
        {
            ...state,
            orderBook: {
                ...state.orderBook,
                data: action.data
            }
        }
    ),
    //Orders
    [Actions.SET_QUEUED_ORDER]: (state, action) => (
        {
            ...state,
            queuedOrder: action.data
        }
    ),
    [Actions.SET_FINISH_ORDER]: (state, action) => (
        {
            ...state,
            finishedOrder: action.data
        }
    ),

    //Aggregate
    [Actions.SET_CALC_TRADE]: (state, action) => (
        {
            ...state,
            aggregate: {
                ...state.aggregate,
                trade: action.data
            }
        }
    ),
    [Actions.SET_CALC_ORDER]: (state, action) => (
        {
            ...state,
            aggregate: {
                ...state.aggregate,
                order: action.data
            }
        }
    ),

    //SID
    [Actions.SET_SID]: (state, action) => (
        {
            ...state,
            token: action.data
        }
    ),

    //Selected instrument id
    [Actions.SET_SELECTED_INSTRUMENT]: (state, action) => (
        {
            ...state,
            selected_instrument: action.data
        }
    ),

    //Linkers
    [Actions.SET_LINKER_REQUEST]: (state, action) => (
        {
            ...state,
            linkers: action.data
        }
    ),

    [Actions.AUTO_START_LINKER]: (state, action) => (
        {
            ...state,
            autoStartLinkerId: action.data
        }
    ),

    [Actions.REMOVE_STARTED_LINKER_AUTO]: (state) => (
        {
            ...state,
            autoStartLinkerId: ''
        }
    ),

    [Actions.SET_EDIT_LINKER_PARAMETERS]: (state, action) => (
        {
            ...state,
            linkers: {
                ...state.linkers,
                [action.data.linker_id]: action.data
            }
        }
    ),

    //Resources
    [Actions.SET_RESOURCE_REQUEST]: (state, action) => (
        {
            ...state,
            linkers: action.data
        }
    ),

    //Strategies
    [Actions.SET_STRATEGIES_INFO]: (state, action) => (
        {
            ...state,
            strategies: action.data
        }
    ),

    //Candle
    [Actions.SET_CANDLE]: (state, action) => (
        {
            ...state,
            candle: action.data
        }
    ),

    //Settings
    [Actions.SET_SETTING_REQUEST]: (state, action) => (
        {
            ...state,
            settings: action.data
        }
    ),

    //ORDER TRUE WAY
    [Actions.SET_ORDER_TRUE_WAY]: (state, action) => (
        {
            ...state,
            orderTrueWay: action.data
        }
    ),

    //Login
    [Actions.SET_IS_LOGIN]: state => (
        {
            ...state,
            isLogin: true
        }
    ),
    [Actions.UNSET_IS_LOGIN]: () => {
        console.log("UNSET", initialState)
        return ({
            ...initialState,
            orderReport: {
              byInstrument: {},
              byLinker: {}
            },
            isLogin:false
        })
    }
}, initialState);
