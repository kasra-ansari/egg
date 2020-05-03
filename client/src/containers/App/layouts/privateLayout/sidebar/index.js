import React, {Component} from 'react';
import {Icon, Layout, Menu} from 'antd';
import {withRouter} from "react-router-dom";
// import './styles.less';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {Sider} = Layout;


class Sidebar extends Component {
    handleClick = (e) => {

        return this.props.history.push(`/${e.key}`);
    };

    render() {
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
            >
                <div className="logo"><img src={''} alt=""/></div>

                <Menu theme="dark" mode="inline"
                      defaultSelectedKeys={['dashboard']}
                      // defaultOpenKeys={openKeys}
                      onClick={this.handleClick}
                >
                    <Menu.Item key="dashboard">
                        <Icon type="home"/>
                        <span>داشبورد</span>
                    </Menu.Item>

                    <SubMenu
                        key="user"
                        title={<span>
                            <Icon type="user" />
                            <span>کاربر</span>
                        </span>}
                    >
                        <Menu.Item key="users/list">لیست کاربران</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="post"
                        title={<span>
                            <Icon type="form" />
                            <span>پست‌ها</span>
                        </span>}
                    >
                        <Menu.Item key="posts/create">ایجاد</Menu.Item>
                        <Menu.Item key="posts/list">لیست</Menu.Item>
                    </SubMenu>

                </Menu>
            </Sider>
        )
    }
}

export default withRouter(Sidebar);
