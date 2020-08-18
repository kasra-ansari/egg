import Api from "../Api";
import store from "../../redux/store/index";
import {setSelectedInstrumentId, setWatchList} from "../../redux/app/actions";

const state = () => {
    return store.getState()
};

class RequestService {
    static selectShare = async (instrumentId) => {
        if (instrumentId === undefined) {
            const existInstrument = localStorage.getItem('instrument');
            instrumentId = (!!existInstrument && existInstrument) || 'IRO3ZOBZ0001';
        }
        try {
            const regexTest = /^IR/.test(instrumentId);
            if (regexTest) {
                store.dispatch(setSelectedInstrumentId(instrumentId));
                localStorage.setItem('instrument', instrumentId);
                return await Api.get({url: `/select_share/${instrumentId}/?username=${state().app.user.username}&sid=${state().sid}`});
            }

        } catch (e) {
            console.log(e)
        }
    };

    static insertOrder = async (side, hugeOrder, price, volume, linkerId = 0) => {
        try {
            const selectedIns = state().app.selected_instrument;
            return await Api.get({url: `/insert_order/?username=${state().app.user.username}&sid=${state().sid}&side=${side}&instrument_id=${selectedIns}&huge_order=${hugeOrder}&price=${price}&volume=${volume}&linker_id=${linkerId}`});
        } catch (e) {
            console.log(e)
        }
    };

    static startLinker = async (linkerId) => {
        try {
            await Api.get({url: `/start_linker/?username=${state().app.user.username}&sid=${state().sid}&linker_id=${linkerId}`})
        } catch (e) {
            console.log(e)
        }
    };

    static addLinker = async (type, param, cb) => {
        try {
            // const res = await Api.get({url: `/add_linker/?username=${state().app.user.username}&sid=${state().sid}&type=${type}&param=${param}`});
            const res = await Api.post({
                url: `/add_linker/`,
                data: {
                    username: state().app.user.username,
                    sid: state().sid,
                    type: type,
                    param: param
                }
            });

            if (cb) cb(res);
        } catch (e) {
            console.log(e)
        }
    }

    static login = async (username, password, cb) => {
        try {
            const res = await Api.get({url: `/login/?username=${username}&password=${password}`});
            if (cb) cb(res);
        } catch (e) {
            console.log(e)
        }
    }

    static stopResource = async (linkerId, instrumentId) => {
        try {
            await Api.get({url: `/stop_resource/?username=${state().app.user.username}&sid=${state().sid}&linker_id=${linkerId}&instrument_id=${instrumentId}`});
        } catch (e) {
            console.log(e)
        }
    }

    static stopLinker = async linkerId => {
        try {
            await Api.get({url: `/stop_linker/?username=${state().app.user.username}&sid=${state().sid}&linker_id=${linkerId}`})
        } catch (e) {
            console.log(e)
        }
    }

    static getWatchListNames = async (cb) => {
        try {
            const res = await Api.get({url: `/get_watchlist_names/?username=${state().app.user.username}&sid=${state().sid}`});

            if (res.data.status === 'success') store.dispatch(setWatchList(res.data.data))
            if (cb) cb(res);
        } catch (e) {
            console.log(e)
        }
    }

    static getWatchList = async (watchId, cb) => {
        try {
            const res = await Api.get({url: `/get_watchlist/?username=${state().app.user.username}&sid=${state().sid}&watchlistID=${watchId}`});
            if (cb) cb(res)

            if (res.data.data) {
                const instruments = [];
                res.data.data.length > 0 && res.data.data.map(item => instruments.push(item.instrumentID));

                if (instruments.length > 0)
                    await RequestService.subscribeInstrumentsList(instruments);
            }
        } catch (e) {
            console.log(e)
        }
    }

    static addNewWatchList = async (name, cb) => {
        try {
            const res = await Api.get({url: `/add_new_watchlist/?username=${state().app.user.username}&sid=${state().sid}&watchlistName=${name}`})

            if (cb) cb(res)
        } catch (e) {
            console.log(e)
        }
    }

    static editWatchList = async (watchlistId, newName, cb) => {
        try {
            const res = await Api.get({url: `/edit_watchlist/?username=${state().app.user.username}&sid=${state().sid}&watchlistID=${watchlistId}&newName=${newName}`});
            if (cb) cb(res);
        } catch (e) {
            console.log(e)
        }
    }

    static addInstrumentToWatchList = async (instrumentId, watchId, cb) => {
        try {
            const res = await Api.get({url: `/add_instrument_to_watchlist/?username=${state().app.user.username}&sid=${state().sid}&watchlistID=${watchId}&instrumentID=${instrumentId}`})
            if (cb) cb(res)
        } catch (e) {
            console.log(e)
        }
    }

    static removeInstrumentFromWatchList = async (instrumentId, watchId, cb) => {
        try {
            const res = await Api.get({url: `/remove_instrument_from_watchlist/?username=${state().app.user.username}&sid=${state().sid}&watchlistID=${watchId}&instrumentID=${instrumentId}`})
            if (cb) cb(res)
        } catch (e) {
            console.log(e)
        }
    }

    static removeWatchList = async (watchId, cb) => {
        try {
            const res = await Api.get({url: `/remove_watchlist/?username=${state().app.user.username}&sid=${state().sid}&watchlistID=${watchId}`});

            if (cb) cb(res);
        } catch (e) {

        }
    }

    static updateOrder = async (orderId, price, volume, cb) => {
        try {
            const res = await Api.get({url: `/update_order/?username=${state().app.user.username}&sid=${state().sid}&order_id=${orderId}&price=${price}&volume=${volume}`});
            if (cb) cb(res);
        } catch (e) {
            console.log(e)
        }
    }

    static removeOrder = async (orderId, cb) => {
        try {
            const res = await Api.get({url: `/remove_order/?username=${state().app.user.username}&sid=${state().sid}&order_id=${orderId}`})
            if (cb) cb(res);
        } catch (e) {
            console.log(e)
        }
    }

    static setSetting = async (params, cb) => {
        try {
            const res = await Api.get({url: `/set_setting/?username=${state().app.user.username}&sid=${state().sid}${params}`});

            if (cb) cb(res)
        } catch (e) {
            console.log(e)
        }
    }

    static subscribeInstrument = async (instrumentId, cb) => {
        try {
            const res = await Api.get({url: `/subscribe_share/?username=${state().app.user.username}&sid=${state().sid}&instrumentID=${instrumentId}`});

            if (cb) cb(res);
        } catch (e) {

        }
    }

    static subscribeInstrumentsList = async (instrumentList, cb) => {
        try {
            const res = await Api.get({url: `/subscribe_shares/?username=${state().app.user.username}&sid=${state().sid}&instrumentIDs=${instrumentList}`});

            if (cb) cb(res);
        } catch (e) {

        }
    }

    static editResourceParamters = async (params, linker_id, instrument_id, cb) => {
        try {
            const res = await Api.post({
                url: `/edit_resource_parameter/`,
                data: {
                    username: state().app.user.username,
                    sid: state().sid,
                    parameters: params,
                    linker_id: linker_id,
                    instrument_id: instrument_id
                }
            })

            if (cb) cb(res);
        } catch (e) {

        }
    }

    static anotherLogin = async (username, password) => {
        try {
            return await Api.get({url: `/login?username=${username}&password=${password}`})
        } catch (e) {

        }
    }
}

export default RequestService;
