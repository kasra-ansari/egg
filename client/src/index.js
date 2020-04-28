import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from "./containers/App";
import {Provider} from "react-redux";
import Store from "./redux/store";
import "./containers/App/themeConfig/variables.less";
import {ConfigProvider} from "antd";
import faIR from 'antd/lib/locale-provider/fa_IR';
import {Route, Router} from "react-router-dom";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={Store}>
        <ConfigProvider locale={faIR}>
            <Router history={history}>
                <Route path="/" component={App}/>
            </Router>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
