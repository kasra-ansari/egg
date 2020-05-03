import React, {Component} from "react";
import {PrivateRoute} from "../../components/PrivateRoute";
import CreatePosts from "./create";
import PostsList from "./List";

class PostsContainer extends Component {
    render() {
        const {match} = this.props;
        return (
            <>
                <PrivateRoute path={`${match.url}/create`} component={CreatePosts}/>
                <PrivateRoute path={`${match.url}/list`} component={PostsList}/>
            </>
        )
    }
}

export default PostsContainer;
