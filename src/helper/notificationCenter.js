import {notification} from "antd";

const notificationCenter = (data, type = 'warning', placement = 'topLeft') => {

    notification[type]({
        key: 'updateAble',
        message: data.message,
        description: data.description || '',
        placement: placement,
    })
};

export default notificationCenter;
