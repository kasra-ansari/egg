import React, {Component} from "react";
import RequestService from "../../../services/requests";
import {Table} from "antd";
import columns from "./columns";

class UsersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: {}
        }
    }

    loadList = () => {
        RequestService.usersList().then(res => {
            if (res) this.setState({users: res.data.data})
        })
    }

    componentDidMount() {
        this.loadList();
    }

    deleteUser = (rec) => {
        RequestService.deleteUser(rec._id).then(res => {
            console.log("deleted", res)
            if (res && res.data.data === 'ok') this.loadList()
        })
    }

    render() {
        console.log("USER LIST", this.state)

        return (
            <div>
                <Table rowKey={e => e.mobile} dataSource={this.state.users.list || []} columns={columns({delete: this.deleteUser})} />
            </div>
        );
    }
}

export default UsersList;
