
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }


        return JSON.parse(serializedState);
    } catch (e) {
        return undefined
    }
};

export const loadSid = () => {
    try {
        const sid = localStorage.getItem('sid');

        if (sid === null) {
            return '';
        }

        return JSON.parse(sid)
    } catch (e) {

    }
}

export const saveSid = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('sid', serializedState);
    } catch (e) {
        console.log(e)
    }
}

let oldTimeStamp = (Date.now()).valueOf();
const millisecondsBetween = 10000;
export const saveState = (state) => {

    if (((Date.now()).valueOf() - oldTimeStamp) > millisecondsBetween) {
        console.log("SAVE STATE, ", (Date.now()).valueOf() - oldTimeStamp )

        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('state', serializedState);
            oldTimeStamp = (Date.now()).valueOf()
        } catch (e) {
            console.log(e);
        }
    }

}
