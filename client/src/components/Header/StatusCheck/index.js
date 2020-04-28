import React from "react";
import {Icon, Tooltip} from "antd";
import "./styles.less";

const StatusCheck = (props) => {
    return (
        <div className="status-checker">
            <span>
                <Tooltip title={`${(props.status.prana === 'True' && 'ارتباط با پرانا برقرار') || 'ارتباط با پارنا قطع'}`}>
                    <Icon type="wifi"
                          style={{color: (props.status.prana === 'True' && 'green') || 'red'}}/>
                </Tooltip>
            </span>
            <span>
                <Tooltip title={`${(props.status.oms === 'True' &&  'ارتباط با هسته برقرار') || 'ارتباط با هسته قطع'}`}>
                    <Icon type="api"
                          style={{color: (props.status.oms === 'True' && 'green') || 'red'}}/>
                </Tooltip>
            </span>
        </div>
    )
};

export default StatusCheck;
