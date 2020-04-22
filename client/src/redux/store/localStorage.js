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

        return sid;
    } catch (e) {

    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log(e);
    }
}
