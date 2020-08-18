import store from "../../redux/store/index";


function WebsocketConnection(url) {
    // const token = () => store.getState().sid || '';

    console.log("WebsocketConnection", store)
    return new Promise((resolve, reject) => {
        // const ws = new WebSocket(`${window.env.WS_SERVER}/${token()}/`);
        const ws = new WebSocket(url);

        ws.onopen = function () {
            resolve(ws);
        };

        ws.onerror = function (err) {
            reject(err);
        }
    });
}

export default WebsocketConnection;
