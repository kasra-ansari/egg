import React from "react";
import './styles.less';

class PublicLayout extends React.Component {
    render(){
        return (
            <div className="public-layout">
                {this.props.children}
            </div>
        )
    }
}

export default PublicLayout;
