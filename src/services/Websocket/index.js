import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    availableShares, candleRequest, editResourceParameters, linkerRequest,
    orderRequest, resourceRequest,
    setBuyingPower,
    setOrderBook, setSid,
    setStatus,
    setTime, settingRequest,
    setUserInfo, sharesInfo, shareStatusChange, strategiesInfo, unsetSession, updateShares
} from "../../redux/app/actions";
import Websocket from "react-websocket";
import PreLoading from "../../components/PreLoading";
import notificationCenter from "../../helper/notificationCenter";

const mapDispatchToProps = (dispatch) => (
    {
        setUserInfoAction: (data) => dispatch(setUserInfo(data)),
        setStatusAction: data => dispatch(setStatus(data)),
        setBuyingPowerAction: data => dispatch(setBuyingPower(data)),
        setTimeAction: data => dispatch(setTime(data)),
        setOrderBookAction: data => dispatch(setOrderBook(data)),
        availableSharesAction: data => dispatch(availableShares(data)),
        sharesInfoAction: data => dispatch(sharesInfo(data)),
        setSidAction: data => dispatch(setSid(data)),
        orderRequestAction: (data, title) => dispatch(orderRequest(data, title)),
        updateSharesAction: data => dispatch(updateShares(data)),
        linkerRequestAction: (data, title) => dispatch(linkerRequest(data, title)),
        resourceRequestAction: data => dispatch(resourceRequest(data)),
        strategiesInfoAction: data => dispatch(strategiesInfo(data)),
        unsetSessionAction: () => dispatch(unsetSession()),
        candleRequestAction: (data, title) => dispatch(candleRequest(data, title)),
        shareStatusChangeAction: data => dispatch(shareStatusChange(data)),
        settingRequestAction: data => dispatch(settingRequest(data)),
        editResourceParametersAction: data => dispatch(editResourceParameters(data))
    }
);

const mapStateToProps = (state) => (
    {
        sid: state.sid,
    }
);

export const webSocketService = () => {
    return (ComposedComponent) => {
        return @connect(mapStateToProps, mapDispatchToProps)
        class WebSocketService extends Component {
            constructor(props) {
                super(props);

                this.state = {
                    socketIsOpen: false
                }
            }

            handleData = async (data) => {
                try {
                    const socket = await JSON.parse(data.replace(/'/g, '"'));
                    // const socket = await JSON.parse(data);
                    // console.log("socket", socket)
                    await this.getData(socket.title, socket)
                } catch (e) {
                    console.error(e, data)
                }

            }

            getData = async (type, data) => {
                try {
                    const extractor = {
                        // 'sid': async () => (
                        //     this.props.setSidAction(data.data)
                        // ),
                        'user_info': async () => (
                            this.props.setUserInfoAction(data)
                        ),
                        'status': async () => (
                            this.props.setStatusAction(data.data)
                        ),
                        'buying_power': async () => (
                            this.props.setBuyingPowerAction(data.data)
                        ),
                        'time': async () => (
                            this.props.setTimeAction(data.data)
                        ),
                        'orderbook': async () => (
                            this.props.setOrderBookAction(data.data)
                        ),
                        'reconnect_data': async () => {
                            this.props.linkerRequestAction(data.linkers, 'reconnect');
                            this.props.orderRequestAction(data.orders, 'reconnect');
                        },
                        'insert_order': async () => (
                            this.props.orderRequestAction(data.data, 'insert')
                        ),
                        'finish_order': async () => (
                            this.props.orderRequestAction(data.data, 'finish')
                        ),
                        'update_order': async () => (
                            this.props.orderRequestAction(data.data, 'update')
                        ),
                        'partially_order': async () => (
                            this.props.orderRequestAction(data.data, 'partially')
                        ),
                        'remove_order': async () => (
                            this.props.orderRequestAction(data.data, 'remove')
                        ),
                        'available_shares': async () => (
                            this.props.availableSharesAction(data.data)
                        ),
                        'share_informations': async () => (
                            this.props.sharesInfoAction(data.data)
                        ),
                        'share_info': async () => (
                            this.props.updateSharesAction(data.data)
                        ),
                        'add_linker': async () => (
                            this.props.linkerRequestAction(data.data, 'insert')
                        ),
                        'start_linker': async () => (
                            this.props.linkerRequestAction(data.data, 'start')
                        ),
                        'finish_linker': async () => (
                            this.props.linkerRequestAction(data.data, 'finish')
                        ),
                        'stop_linker': async () => (
                            this.props.linkerRequestAction(data.data, 'stop')
                        ),
                        'error_linker': async () => (
                            this.props.linkerRequestAction(data.data, 'error')
                        ),
                        'finish_resource': async () => (
                            this.props.resourceRequestAction(data.data)
                        ),
                        'update_resource': async () => (
                            this.props.resourceRequestAction(data.data)
                        ),
                        'stop_resource': async () => (
                            this.props.resourceRequestAction(data.data)
                        ),
                        'stop_resource_failed': async () => (
                            this.props.resourceRequestAction(data.data)
                        ),
                        'strategies_info': async () => (
                            this.props.strategiesInfoAction(data.data)
                        ),
                        'notification': async () => (
                            notificationCenter(data.data)
                        ),
                        'error': async () => (
                            notificationCenter(data.data)
                        ),
                        'candle': async () => (
                            this.props.candleRequestAction(data.data, 'set')
                        ),
                        'update_candle': async () => (
                            this.props.candleRequestAction(data.data, 'update')
                        ),
                        'share_status_changed': async () => (
                            this.props.shareStatusChangeAction(data.data)
                        ),
                        'settings': async () => (
                            this.props.settingRequestAction(data.data)
                        ),
                        'edit_linker_parameters': async () => (
                            this.props.editResourceParametersAction(data.data)
                        ),
                        'default': async () => {
                            return null
                        }
                    };

                    return await (extractor[type] || extractor['default'])();
                } catch (e) {
                    console.log(e)
                }
            };

            handleOpen = data => {
                console.log("OPEN CONNECTION", data)
                setTimeout(() => {
                    this.setState({
                        socketIsOpen: true
                    })
                },1000)


            }

            handleClose = () => {
                console.log("CONNECTION CLOSED")
                this.props.unsetSessionAction();
            }

            sendMessage = () => {
                this.refWebSocket.sendMessage("hi")
            }

            // shouldComponentUpdate(nextProps, nextState, nextContext) {
            //     return nextState.socketIsOpen !== this.state.socketIsOpen
            // }

            render() {
                console.log("WEBSOCKET SERVICE", this.props)
                return (
                    <div>
                        <Websocket url={`${window.env.WS_SERVER}/${this.props.sid}/`} onMessage={this.handleData}
                                   onOpen={this.handleOpen} onClose={this.handleClose}
                                   ref={websocket => this.refWebSocket = websocket}/>
                        {
                            this.state.socketIsOpen ?
                                <ComposedComponent websocket="ON" {...this.props}/>
                                :
                                <PreLoading />
                        }
                    </div>

                )
            }
        }


    }
}
