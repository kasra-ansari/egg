import React, { Component } from "react";
import { connect } from "react-redux";
// import { Redirect, Route } from "react-router-dom";
// import { PrivateRoute } from "../../components/PrivateRoute";
import Layout from "./Layout";
import { Button } from 'react-bootstrap';

const mapStateToProps = (state) => (
    {
        isLogin: state.app.isLogin,
    }
);

@connect(mapStateToProps)
class App extends Component {
    render() {
        return (
            <>
                <Layout>
                    this is app <Button>hi</Button>
                </Layout>
            </>
        )
    }
}


export default App;
