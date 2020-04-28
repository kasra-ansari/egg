import {handleActions} from 'redux-actions';
import * as Actions from '../actions/constants';

const initialState = {
    token: '',
    isLogin: !!localStorage.getItem('isLogin') && localStorage.getItem('isLogin') === 'true',
}

export const AppReducers = handleActions({
    //SID
    [Actions.SET_TOKEN]: (state, action) => (
        {
            ...state,
            token: action.data
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
            isLogin:false
        })
    }
}, initialState);
