import * as Action from './constants';

//UI
export const setSession = data => ({type: Action.SET_SESSION, data: data})
export const unsetSession = () => ({type: Action.UNSET_SESSION});
//
// export const setToken = (data) => ({type: Action.SET_TOKEN, data: data});

export const setUserInfo = (data) => ({type: Action.USER_INFO, data: data});
export const setWatchList = data => ({type: Action.SET_WATCH_LIST, data: data});

// export const setSidebarStatus = (data) => ({type: Action.SET_SIDEBAR_STATUS, data: data});


//Status
export const setStatus = data => ({type: Action.SET_STATUS, data: data});

//Buying power
export const setBuyingPower = data => ({type: Action.SET_BUYING_POWER, data: data});

//Time
export const setTime = data => ({type: Action.SET_TIME, data: data});

//Order book
export const setOrderBook = data => ({type: Action.ORDER_BOOK, data: data});

//Order
export const orderRequest = (data, title) => ({type: Action.ORDER_REQUEST, data: data, title: title})

//Available shares
export const availableShares = data => ({type: Action.AVAILABLE_SHARE, data: data});
export const sharesInfo = data => ({type: Action.SHARES_INFO, data: data});
export const updateShares = data => ({type: Action.UPDATE_SHARE_INFO, data: data});

export const setSelectedInstrumentId = data => ({type: Action.SET_SELECTED_INSTRUMENT, data: data});

//TODO: check it
export const setSid = data => ({type: Action.SET_SID, data: data});

//Linker
export const linkerRequest = (data, title) => ({type: Action.LINKER_REQUEST, data: data, title: title});
export const autoStartLinker = data => ({type: Action.AUTO_START_LINKER, data: data});
export const editResourceParameters = data => ({type: Action.SET_EDIT_LINKER_PARAMETERS, data: data});

//Resource
export const resourceRequest = data => ({type: Action.RESOURCE_REQUEST, data: data});

//Strategies
export const strategiesInfo = data => ({type: Action.STRATEGIES_INFO, data: data});

//Candle
export const candleRequest = (data, title) => ({type: Action.CANDLE_REQUEST, data: data, title: title});

//Share status change
export const shareStatusChange = data => ({type: Action.SHARE_STATUS_CHANGE, data: data});

//Setting
export const settingRequest = data => ({type: Action.SETTING_REQUEST, data: data});

//Socket
export const initialSocket = url => ({type: Action.SOCKET_INITIAL, url: url});

//ORDER TRUE WAY
export const orderTrueWay = data => ({type: Action.SET_ORDER_TRUE_WAY, data: data});

//Notification
export const sendNotification = data => ({type: Action.NOTIFICATION_BAR, data: data});
