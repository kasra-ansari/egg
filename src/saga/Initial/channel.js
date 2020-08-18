import {eventChannel, END} from "redux-saga";

function createSocketChannel(socket) {
    return eventChannel(emit => {
        socket.onmessage = (event) => {
            emit(event.data)
        };

        socket.onclose = () => {
            emit(END);
        };

        return () => {
            socket.onmessage = null;
        };
    })
}

export default createSocketChannel;
