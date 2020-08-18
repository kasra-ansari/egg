import * as ActionType from "../../../redux/app/actions/constants";
import {put, select} from "redux-saga/effects";

function* orderReportMiddleware(action) {
    let instrument = {}, linkers = {};

    // yield delay(100);
    const store = yield select();

    for (let [,value] of Object.entries(action.data)) {
        if (value.status === 'initialized' || value.status === 'started') {
            for (let [instruKey, innerValue] of (Object.entries(value.resources))) {
                switch (innerValue.info.status) {
                    case 'init':
                    case 'started': {
                        if (innerValue.side === 'N') {
                            instrument = {
                                ...instrument,
                                [`${instruKey}_B`]: {
                                    ...(instrument[`${instruKey}_B`] && instrument[`${instruKey}_B`]),
                                    expectedVolume:  ((instrument[`${instruKey}_B`] && instrument[`${instruKey}_B`].expectedVolume) || 0) + ((innerValue.info.volume) - (innerValue.info.executed_volume)),
                                    id: instruKey,
                                    side: 'B',
                                    shareLastPrice: (store.app.shareInformation[instruKey] && store.app.shareInformation[instruKey].last_price) || 0,
                                    section: 'order',
                                    name: store.app.shareInformation[instruKey].symbol,
                                },
                                [`${instruKey}_S`]: {
                                    ...(instrument[`${instruKey}_S`] && instrument[`${instruKey}_S`]),
                                    expectedVolume:  ((instrument[`${instruKey}_S`] && instrument[`${instruKey}_S`].expectedVolume) || 0) + ((innerValue.info.volume) - (innerValue.info.executed_volume)),
                                    id: instruKey,
                                    side: 'S',
                                    shareLastPrice: (store.app.shareInformation[instruKey] && store.app.shareInformation[instruKey].last_price) || 0,
                                    section: 'order',
                                    name: store.app.shareInformation[instruKey].symbol,
                                }
                            };
                            linkers = {
                                ...linkers,
                                [`${innerValue.info.linker_id}_S`]: {
                                    expectedVolume: ((linkers[`${innerValue.info.linker_id}_S`] && linkers[`${innerValue.info.linker_id}_S`].expectedVolume) || 0) + (innerValue.info.volume - innerValue.info.executed_volume),
                                    id: innerValue.info.linker_id,
                                    side: 'S',
                                    // shareLastPrice: (store.app.shareInformation[instruKey] && store.app.shareInformation[instruKey].last_price) || 0,
                                    section: 'order',
                                    name: value.name,
                                    expectedPrice: ((linkers[`${innerValue.info.linker_id}_S`] && linkers[`${innerValue.info.linker_id}_S`].expectedPrice) || 0) +
                                        ((innerValue.info.volume - innerValue.info.executed_volume) * ((store.app.shareInformation[instruKey] && store.app.shareInformation[instruKey].last_price) || 0))
                                },
                                [`${innerValue.info.linker_id}_B`]: {
                                    expectedVolume: ((linkers[`${innerValue.info.linker_id}_B`] && linkers[`${innerValue.info.linker_id}_B`].expectedVolume) || 0) + (innerValue.info.volume - innerValue.info.executed_volume),
                                    id: innerValue.info.linker_id,
                                    side: 'B',
                                    // shareLastPrice: (store.app.shareInformation[instruKey] && store.app.shareInformation[instruKey].last_price) || 0,
                                    section: 'order',
                                    name: value.name,
                                    expectedPrice: ((linkers[`${innerValue.info.linker_id}_B`] && linkers[`${innerValue.info.linker_id}_B`].expectedPrice) || 0) +
                                        ((innerValue.info.volume - innerValue.info.executed_volume) * ((store.app.shareInformation[instruKey] && store.app.shareInformation[instruKey].last_price) || 0))
                                },
                            };
                        } else {
                            instrument = {
                                ...instrument,
                                [`${instruKey}_${innerValue.side}`]: {
                                    ...(instrument[`${instruKey}_${innerValue.side}`] && instrument[`${instruKey}_${innerValue.side}`]),
                                    expectedVolume:  ((instrument[`${instruKey}_${innerValue.side}`] && instrument[`${instruKey}_${innerValue.side}`].expectedVolume) || 0) + ((innerValue.info.volume) - (innerValue.info.executed_volume)),
                                    id: instruKey,
                                    side: innerValue.info.side,
                                    shareLastPrice: (store.app.shareInformation[instruKey] && store.app.shareInformation[instruKey].last_price) || 0,
                                    section: 'order',
                                    name: store.app.shareInformation[instruKey].symbol,
                                }
                            };

                            linkers = {
                                ...linkers,
                                [`${innerValue.info.linker_id}_${innerValue.info.side}`]: {
                                    expectedVolume: ((linkers[`${innerValue.info.linker_id}_${innerValue.info.side}`] && linkers[`${innerValue.info.linker_id}_${innerValue.info.side}`].expectedVolume) || 0) + (innerValue.info.volume - innerValue.info.executed_volume),
                                    id: innerValue.info.linker_id,
                                    side: innerValue.info.side,
                                    // shareLastPrice: (store.app.shareInformation[instruKey] && store.app.shareInformation[instruKey].last_price) || 0,
                                    section: 'order',
                                    name: value.name,
                                    expectedPrice: ((linkers[`${innerValue.info.linker_id}_${innerValue.info.side}`] && linkers[`${innerValue.info.linker_id}_${innerValue.info.side}`].expectedPrice) || 0) +
                                        ((innerValue.info.volume - innerValue.info.executed_volume) * ((store.app.shareInformation[instruKey] && store.app.shareInformation[instruKey].last_price) || 0))
                                }
                            };
                        }

                        break;
                    }
                    default: {
                        if (instrument[`${instruKey}_B`] || instrument[`${instruKey}_S`]) delete instrument[`${instruKey}_${innerValue.side}`];
                        if (linkers[`${innerValue.info.linker_id}_B`] || linkers[`${innerValue.info.linker_id}_S`]) delete linkers[`${innerValue.info.linker_id}_${innerValue.info.side}`]
                    }
                }
            }
        }

    }

    yield put({type: ActionType.SET_ORDER_REPORT, data: {byLinker: linkers, byInstrument: instrument}});
}

export default orderReportMiddleware;

