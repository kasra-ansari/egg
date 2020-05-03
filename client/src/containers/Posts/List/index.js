import React, {Component} from "react";
import RequestService from "../../../services/requests";
import {Table} from "antd";
import columns from "./columns";

class PostsList extends Component {
    constructor(props) {
        super(props);
         this.state = {
             posts: {}
         }
    }

    postList = async () => {
        const res = await RequestService.postList()

        if (res) {
            console.log(res)
            this.setState({posts: res.data.data})
        }
    }

    componentDidMount() {
        this.postList()
    }

    render() {
        return (
            <div>
                <Table rowKey={e => e._id} dataSource={this.state.posts.list || []} columns={columns}/>
            </div>
        )
    }
}

export default PostsList;
