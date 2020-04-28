import * as Action from './constants';

//UI
export const setSession = data => ({type: Action.SET_SESSION, data: data})
export const unsetSession = () => ({type: Action.UNSET_SESSION});
//
// export const setToken = (data) => ({type: Action.SET_TOKEN, data: data});

// export const setSidebarStatus = (data) => ({type: Action.SET_SIDEBAR_STATUS, data: data});


//Status

//TODO: check it
export const setSid = data => ({type: Action.SET_SID, data: data});

export const setToken = data => ({type: Action.SET_TOKEN, data: data});

