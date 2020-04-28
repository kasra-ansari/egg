import React, {Component, Suspense} from "react";
import {connect} from "react-redux";
import LayoutSwitcher from "./layouts/LayoutSwitcher";
import {Redirect, Route} from "react-router-dom";
import {PrivateRoute} from "../../components/PrivateRoute";
import Loading from "../../components/Loading";
// import NotFoundPage from "./NotFoundPage";

const Login = React.lazy(() => import("../Users/Login"));

const mapStateToProps = (state) => (
    {
        isLogin: state.app.isLogin,
    }
);

@connect(mapStateToProps)
class App extends Component {
    render() {
        console.log("redux", this.props)
        return (
            <Suspense fallback={<Loading/>}>
                <LayoutSwitcher condition={this.props.isLogin}>
                    <Route exact path={`/`} render={() => (
                        this.props.isLogin ? <Redirect to={`stocks`}/> : <Redirect to={`login`}/>
                    )}/>

                    {/*<PrivateRoute path={`/stocks`} component={Stocks}/>*/}
                    <Route path={`/login`} component={Login}/>
                    {/*<Route path="*" component={NotFoundPage}/>*/}
                </LayoutSwitcher>
            </Suspense>
        )
    }
}


export default App;
