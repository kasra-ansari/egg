import moment from "moment";


//use in algorithm order for api request
const boolAndTimeFixer = values => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    let vals = {};
    if (values) {
        for (let [key, value] of Object.entries(values)) {
            console.log("TYPE OF", key, value)
            if (typeof value === 'boolean') {
                vals = {
                    ...vals,
                    [key]: capitalizeFirstLetter(value.toString())
                }
            } else if (value instanceof moment) {
                console.log("moment istant", value)
                vals = {
                    ...vals,
                    [key]: moment(value).format('YYYY-MM-DD HH:mm:00.0')
                }
            } else {
                vals = {
                    ...vals,
                    [key]: value
                }
            }
        }
    }


    return vals;
};

export default boolAndTimeFixer;
