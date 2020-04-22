import { combineReducers } from "redux";
import {AppReducers} from '../app/reducer/index';
import {SessionReducer} from "../app/reducer/sessionReducer";

export default combineReducers ({
    app: AppReducers,
    sid: SessionReducer
})
