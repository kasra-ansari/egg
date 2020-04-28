import React, {Suspense} from 'react';
import {Dropdown, Icon, Menu} from "antd";
import "./styles.less";
import {connect} from "react-redux";
import {unsetSession} from "../../../redux/app/actions";
import Loading from "../../Loading";

const Settings = React.lazy(() => import("./Settings"));

const mapDispatchToProps = dispatch => (
    {
        unsetSessionAction: () => dispatch(unsetSession())
    }
)

const UserAccess = (props) => {
    const logout = () => {
        props.unsetSessionAction();
    }

    const handleClick = e => {
        console.log(e)
        if (e.key === 'logout') logout();
    }
    const menu = (
        <Menu onClick={handleClick}>
            <Menu.Item key="setting">
                <Suspense fallback={<Loading/>}>
                    <Settings/>
                </Suspense>
            </Menu.Item>
            <Menu.Item key="logout">
                <span>
                    خروج
                </span>
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="setting-drop-down">
            <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#user">
                    {((props.user && props.user.first_name) || '') + ' ' + (props.user.last_name || '')}<Icon
                    type="user"/>
                </a>
            </Dropdown>
        </div>
    )
};

export default connect(null, mapDispatchToProps)(UserAccess);
