import {eventChannel, END} from "redux-saga";
import store from "../../redux/store/index";

const sid = () => store.getState().sid

const initWebSocket = () => {
    return eventChannel(emitter => {
        const ws = new WebSocket(`${window.env.WS_SERVER}/${sid()}/`);

        ws.onopen = () => {
            console.log("open socket");
        }

        ws.onerror = (error) => {
            console.log('WebSocket error ' + error)
            console.dir(error)
        }

        ws.onmessage = (e) => {
            let msg = null;

            try {
                msg = JSON.parse(e.data.replace(/'/g, '"'));
            } catch (e) {
                console.error("Error parsing", e.data);
            }
            console.log("msg", e, msg)

            if (msg) {
                debugger;
            }
        }

        return () => {
            console.log("socket off")
        }
    })
};

export default initWebSocket;
