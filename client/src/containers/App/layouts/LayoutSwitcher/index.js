import React , {Component} from 'react';
import PrivateLayout from "../privateLayout/index";
import PublicLayout from "../publicLayout/index";
import {Switch} from "react-router-dom";

export default class LayoutSwitcher extends Component {
    render() {
        return (
            this.props.condition ?
                <PrivateLayout>
                    <Switch>
                        {this.props.children}
                    </Switch>
                </PrivateLayout>
                :
                <PublicLayout>{this.props.children}</PublicLayout>
        )
    }
}
