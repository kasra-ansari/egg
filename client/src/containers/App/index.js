import React, {Component} from "react";
import {connect} from "react-redux";
import Websocket from "react-websocket";
import {setShareInformation, setUserInfo} from "../../redux/app/actions";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

// const mapStateToProps = (state) => (
//     {
//         isLogin: state.app.isLogin,
//         sid: state.sid,
//         shareInformation: state.app.shareInformation
//     }
// );
//
// const mapDispatchToProps = (dispatch) => (
//     {
//         setUserInfoAction: (data) => dispatch(setUserInfo(data)),
//         setShareInformationAction: data => dispatch(setShareInformation(data))
//     }
// );

// @connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
        }
    }

    componentDidMount() {
        const socket = socketIOClient(ENDPOINT);
        socket.on("test", data => {
            console.log("DATA COME", data)
            this.setState({data: data})
        });

    }

    render() {
        return (
            <div>
                hi {JSON.stringify(this.state.data)}

            </div>
        )
    }
}


export default App;
