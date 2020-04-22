import {handleActions} from 'redux-actions';
import * as Actions from '../actions/constants';

const initialState = {
    sid: ''
}

export const SessionReducer = handleActions({
    [Actions.SET_SESSION]: (state, action) => (
        {
            ...state,
            sid: action.data
        }
    ),

    [Actions.UNSET_SESSION]: state => (
        {
            ...state,
            ...initialState
        }
    )
}, initialState)
