import React, {Suspense} from "react";
import './style.less'
import {Button, Icon, Layout, Menu, Tooltip} from 'antd';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import logo from "./logo.png";
import Sidebar from "./sidebar/index";


const {Header, Content} = Layout;

const mapStateToProps = (state) => (
    {
        user: state.app.user,
        status: state.app.status,
        time: state.app.time
    }
);


@connect(mapStateToProps)
class PrivateLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    handleLogOut = async () => {
        this.props.unsetIsLoginAction()
    }

    handleMenuClick = e => {
        this.props.history.push(e.key);
    }

    render() {
        return (
            <Layout className="private-layout">
                <Sidebar collapsed={this.state.collapsed}/>
                <Layout>
                    <Header className="header">
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-fold' : 'menu-unfold'}
                            onClick={this.toggle}
                        />
                        <Tooltip title="logout">
                            <Button onClick={this.handleLogOut} type="danger" shape="circle" size="large" icon="logout"
                                    style={{float: 'left', margin: '10px 20px'}}/>
                        </Tooltip>

                    </Header>
                    <Content className='content'>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(PrivateLayout);
