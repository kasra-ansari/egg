import * as Action from './constants';

//UI
// export const setIsLogin = () => ({type: Action.SET_IS_LOGIN});
// export const unsetIsLogin = () => ({type:Action.UNSET_IS_LOGIN});
//
// export const setToken = (data) => ({type: Action.SET_TOKEN, data: data});

export const setUserInfo = (data) => ({type: Action.SET_USER_INFO, data: data});

// export const setSidebarStatus = (data) => ({type: Action.SET_SIDEBAR_STATUS, data: data});

export const setSession = data => ({type: Action.SET_SESSION, data: data})
export const unsetSession = () => ({type: Action.UNSET_SESSION})

export const setShareInformation = data => ({type: Action.SET_SHARE_INFORMATION, data: data});
export const updateShareInfo = data => ({type: Action.UPDATE_SHARE_INFO, data: data});
