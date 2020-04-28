import React from "react";
import "./styles.less";
import {moneyFormat} from "../../../helper/moneyFormat";
import {srvTime} from "../../../helper/serverTimeFormatter";

const TimeBudget = (props) => {
    return (
        <div>
            <div className="time-budget">
                قدرت خرید:
                <span>
                    {
                        moneyFormat(props.user.buying_power) || 0
                    }
                </span>
                ریال
            </div>

            <div className="time-budget">
                زمان سرور:
                <span>
                    {
                        srvTime(props.time) || '00:00'
                    }
                </span>
            </div>
        </div>

    )
};

export default TimeBudget;
