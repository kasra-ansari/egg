import React, {Suspense} from "react";
import './style.less'
import {Layout, Menu} from 'antd';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import logo from "./logo.png";



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
                {/*<Sidebar collapsed={this.state.collapsed}/>*/}
                <Layout hasSider={false}>
                    <Header className="header">
                        <div className="header-left-side"/>

                        <div className="logo">
                            <img src={logo} alt="quantra"/>
                        </div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            // defaultSelectedKeys={['stocks']}
                            selectedKeys={[this.props.location.pathname.replace("/", "")]}
                            style={{lineHeight: '50px'}}
                            onClick={this.handleMenuClick}
                        >
                            <Menu.Item key="stocks">سهام</Menu.Item>
                            <Menu.Item disabled key="bonds">اوراق</Menu.Item>
                        </Menu>
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
