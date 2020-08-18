
export const moneyFormat = number => {
    if (number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export const moneyInt = stringNumber => {
    if (stringNumber) {
        return Number(stringNumber.split(',').join(''))
    }
}
