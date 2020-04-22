import {handleActions} from 'redux-actions';
import * as Actions from '../actions/constants';

const initialState = {
    user: {},
    shareInformation: {}

};

export const AppReducers =  handleActions({
    [Actions.SET_USER_INFO]: (state, action) => (
        {
            ...state,
            user: action.data
        }
    ),

    [Actions.SET_SHARE_INFORMATION]: (state, action) => (
        {
            ...state,
            shareInformation: action.data
        }
    ),

    [Actions.UPDATE_SHARE_INFO]: (state, action) => (
        {
            ...state,
            shareInformation: {
                ...state.shareInformation,
                ...action.data
            }
        }
    )
}, initialState);
