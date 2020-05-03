import {Icon} from "antd";
import React from "react";

export default (props) => [
    {
        title: 'موبایل',
        key: 'mobile',
        dataIndex: 'mobile',
    },
    {
        title: 'نام',
        key: 'fullName',
        dataIndex: 'fullName',
    },
    {
        title: 'تاریخ ایجاد',
        key: 'createdAt',
        dataIndex: 'createdAt',
    },
    {
        title: 'عملیات',
        key: 'action',
        dataIndex: 'action',
        render: (val, rec) => (
            <>
                <Icon type="edit" />
                <Icon type="delete" onClick={() => props.delete(rec)}/>
            </>
        )
    }
]
