const aggregateClc = {
    cost: (item, side, section = 'trade') => (item.side === side && (section === 'order' ? item.price : item.avg_price) * (section === 'order' ? item.volume : item.executed_volume)) || 0,
    count: (item, side) => (item.side === side && 1) || 0,
    volume: (item, side) => (item.side === side && item.volume) || 0,
    executed_volume: (item, side) => (item.side === side && item.executed_volume) || 0,
    reportVolume: (item, side, section) => (item.side === side && (section === 'order' ? (item.volume - item.executed_volume) : item.executed_volume)) || 0
};


const calculateAggregation = (orders, state, section = 'trade') => {
    let instrument = {}, linker = {};

    for (let i=0; i < orders.length; ++i) {
        const item = orders[i];
        const checker = (obj, itemProperty, property) => !!obj && obj[item[itemProperty]] && obj[item[itemProperty]][property];
        const groupChecker = (obj, itemProperty, property) => !!obj && obj[itemProperty] && obj[itemProperty][property];

        instrument = {
            ...instrument,
            [item.instrument_id]: {
                cost_buy: aggregateClc.cost(item, "B", section) + (checker(instrument, 'instrument_id', 'cost_buy') || 0),
                cost_sell: aggregateClc.cost(item, "S", section) + (checker(instrument, 'instrument_id', 'cost_sell') || 0),

                count_buy: aggregateClc.count(item, 'B') + (checker(instrument, 'instrument_id', 'count_buy') || 0),
                count_sell: aggregateClc.count(item, 'S') + (checker(instrument, 'instrument_id', 'count_sell') || 0),

                volume_buy: aggregateClc.volume(item, 'B') + (checker(instrument, 'instrument_id', 'volume_buy') || 0),
                volume_sell: aggregateClc.volume(item, 'S') + (checker(instrument, 'instrument_id', 'volume_sell') || 0),

                exec_volume_buy: aggregateClc.executed_volume(item, 'B') + (checker(instrument, 'instrument_id', 'exec_volume_buy') || 0),
                exec_volume_sell: aggregateClc.executed_volume(item, 'S') + (checker(instrument, 'instrument_id', 'exec_volume_sell') || 0),

                name: (state.app.shareInformation[item.instrument_id] && state.app.shareInformation[item.instrument_id].symbol) || '',
                info: state.app.shareInformation[item.instrument_id],
                id: item.instrument_id,
                section: section,

                groupBy: {
                    ...(instrument[item.instrument_id] && instrument[item.instrument_id].groupBy),
                    [`${item.linker_id}_${item.side}`]: {
                        cost: aggregateClc.cost(item, item.side, section) + (groupChecker(instrument[item.instrument_id] && instrument[item.instrument_id].groupBy, `${item.linker_id}_${item.side}`, 'cost') || 0),
                        count: aggregateClc.count(item, item.side) + (groupChecker(instrument[item.instrument_id] && instrument[item.instrument_id].groupBy, `${item.linker_id}_${item.side}`, 'count') || 0),
                        volume: aggregateClc.volume(item, item.side) + (groupChecker(instrument[item.instrument_id] && instrument[item.instrument_id].groupBy, `${item.linker_id}_${item.side}`, 'volume') || 0),
                        exec_volume: aggregateClc.executed_volume(item, item.side) + (groupChecker(instrument[item.instrument_id] && instrument[item.instrument_id].groupBy, `${item.linker_id}_${item.side}`, 'exec_volume') || 0),

                        side: item.side,

                        name: item.linker_id === 0 ? 'سفارش دستی' : (state.app.linkers[item.linker_id] && state.app.linkers[item.linker_id].name) || '',
                        info: state.app.linkers[item.linker_id],
                        id: item.linker_id,
                        section: section,
                        moreInfo: {
                            linker_id: item.linker_id,
                            linker_name: (state.app.linkers[item.linker_id] && state.app.linkers[item.linker_id].name) || '',
                            instrument_id: item.instrument_id,
                            instrument_name: (state.app.shareInformation[item.instrument_id] && state.app.shareInformation[item.instrument_id].symbol) || ''
                        },
                    }
                },

                report: {
                    ...(instrument[item.instrument_id] && instrument[item.instrument_id].report),
                    [`${item.instrument_id}_${item.side}`]: {
                        cost: aggregateClc.cost(item, item.side, section) + (groupChecker(instrument[item.instrument_id] && instrument[item.instrument_id].report, `${item.instrument_id}_${item.side}`, 'cost') || 0),
                        count: aggregateClc.count(item, item.side) + (groupChecker(instrument[item.instrument_id] && instrument[item.instrument_id].report, `${item.instrument_id}_${item.side}`, 'count') || 0),
                        volume: aggregateClc.reportVolume(item, item.side, section) + (groupChecker(instrument[item.instrument_id] && instrument[item.instrument_id].report, `${item.instrument_id}_${item.side}`, 'volume') || 0),
                        // exec_volume: aggregateClc.executed_volume(item, item.side) + (groupChecker(linker[item.linker_id] && linker[item.linker_id].report, `${item.linker_id}_${item.side}`, 'exec_volume') || 0),
                        side: item.side,
                        name: (state.app.shareInformation[item.instrument_id] && state.app.shareInformation[item.instrument_id].symbol) || '',
                        info: state.app.shareInformation[item.instrument_id],
                        id: item.instrument_id,
                        section: section,
                        moreInfo: {
                            linker_id: item.linker_id,
                            linker_name: (state.app.linkers[item.linker_id] && state.app.linkers[item.linker_id].name) || 'دستی',
                            instrument_id: item.instrument_id,
                            instrument_name: (state.app.shareInformation[item.instrument_id] && state.app.shareInformation[item.instrument_id].symbol) || ''
                        },
                        shareLastPrice: item.share_last_price,

                    }
                },

            }
        };

        linker = {
            ...linker,
            [item.linker_id]: {
                cost_buy: aggregateClc.cost(item, "B", section) + (checker(linker, 'linker_id', 'cost_buy') || 0),
                cost_sell: aggregateClc.cost(item, "S", section) + (checker(linker, 'linker_id', 'cost_sell') || 0),

                count_buy: aggregateClc.count(item, 'B') + (checker(linker, 'linker_id', 'count_buy') || 0),
                count_sell: aggregateClc.count(item, 'S') + (checker(linker, 'linker_id', 'count_sell') || 0),

                volume_buy: aggregateClc.volume(item, 'B') + (checker(linker, 'linker_id', 'volume_buy') || 0),
                volume_sell: aggregateClc.volume(item, 'S') + (checker(linker, 'linker_id', 'volume_sell') || 0),

                exec_volume_buy: aggregateClc.executed_volume(item, 'B') + (checker(linker, 'linker_id', 'exec_volume_buy') || 0),
                exec_volume_sell: aggregateClc.executed_volume(item, 'S') + (checker(linker, 'linker_id', 'exec_volume_sell') || 0),

                name: item.linker_id === 0 ? 'سفارش دستی' : (state.app.linkers[item.linker_id] && state.app.linkers[item.linker_id].name) || '',
                info: state.app.linkers[item.linker_id],
                id: item.linker_id,
                section: section,

                report: {
                    ...(linker[item.linker_id] && linker[item.linker_id].report),
                    [`${item.linker_id}_${item.side}`]: {
                        cost: aggregateClc.cost(item, item.side, section) + (groupChecker(linker[item.linker_id] && linker[item.linker_id].report, `${item.linker_id}_${item.side}`, 'cost') || 0),
                        count: aggregateClc.count(item, item.side) + (groupChecker(linker[item.linker_id] && linker[item.linker_id].report, `${item.linker_id}_${item.side}`, 'count') || 0),
                        volume: aggregateClc.reportVolume(item, item.side, section) + (groupChecker(linker[item.linker_id] && linker[item.linker_id].report, `${item.linker_id}_${item.side}`, 'volume') || 0),
                        // exec_volume: aggregateClc.executed_volume(item, item.side) + (groupChecker(linker[item.linker_id] && linker[item.linker_id].report, `${item.linker_id}_${item.side}`, 'exec_volume') || 0),
                        side: item.side,
                        name: item.linker_id === 0 ? 'سفارش دستی' : (state.app.linkers[item.linker_id] && state.app.linkers[item.linker_id].name) || '',
                        info: state.app.linkers[item.linker_id],
                        id: item.linker_id,
                        section: section,
                        moreInfo: {
                            linker_id: item.linker_id,
                            linker_name: (state.app.linkers[item.linker_id] && state.app.linkers[item.linker_id].name) || 'دستی',
                            instrument_id: item.instrument_id,
                            instrument_name: (state.app.shareInformation[item.instrument_id] && state.app.shareInformation[item.instrument_id].symbol) || ''
                        },
                        performance: {
                            ...(linker[item.linker_id] && linker[item.linker_id].report && linker[item.linker_id].report[`${item.linker_id}_${item.side}`] && linker[item.linker_id].report[`${item.linker_id}_${item.side}`].performance),
                            [`${item.instrument_id}_${item.side}`]: {
                                cost: aggregateClc.cost(item, item.side, section) + ((groupChecker(linker[item.linker_id] && linker[item.linker_id].report && linker[item.linker_id].report[`${item.linker_id}_${item.side}`] && linker[item.linker_id].report[`${item.linker_id}_${item.side}`].performance, `${item.instrument_id}_${item.side}`, 'cost')) || 0),
                                volume: aggregateClc.executed_volume(item, item.side) + ((groupChecker(linker[item.linker_id] && linker[item.linker_id].report && linker[item.linker_id].report[`${item.linker_id}_${item.side}`] && linker[item.linker_id].report[`${item.linker_id}_${item.side}`].performance, `${item.instrument_id}_${item.side}`, 'volume')) || 0),
                                id: item.instrument_id,
                                side: item.side
                            }
                        }
                    }
                },

                groupBy: {
                    ...(linker[item.linker_id] && linker[item.linker_id].groupBy),
                    [`${item.instrument_id}_${item.side}`]: {
                        cost: aggregateClc.cost(item, item.side, section) + (groupChecker(linker[item.linker_id] && linker[item.linker_id].groupBy, `${item.instrument_id}_${item.side}`, 'cost') || 0),
                        count: aggregateClc.count(item, item.side) + (groupChecker(linker[item.linker_id] && linker[item.linker_id].groupBy, `${item.instrument_id}_${item.side}`, 'count') || 0),
                        volume: aggregateClc.volume(item, item.side) + (groupChecker(linker[item.linker_id] && linker[item.linker_id].groupBy, `${item.instrument_id}_${item.side}`, 'volume') || 0),
                        exec_volume: aggregateClc.executed_volume(item, item.side) + (groupChecker(linker[item.linker_id] && linker[item.linker_id].groupBy, `${item.instrument_id}_${item.side}`, 'exec_volume') || 0),
                        side: item.side,
                        name: (state.app.shareInformation[item.instrument_id] && state.app.shareInformation[item.instrument_id].symbol) || '',
                        info: state.app.shareInformation[item.instrument_id],
                        id: item.instrument_id,
                        section: section,
                        moreInfo: {
                            linker_id: item.linker_id,
                            linker_name: (state.app.linkers[item.linker_id] && state.app.linkers[item.linker_id].name) || '',
                            instrument_id: item.instrument_id,
                            instrument_name: (state.app.shareInformation[item.instrument_id] && state.app.shareInformation[item.instrument_id].symbol) || ''
                        }
                    }
                }
            }
        }
    }

    return {
        byInstrument: instrument,
        byLinker: linker
    }
};

export default calculateAggregation;
