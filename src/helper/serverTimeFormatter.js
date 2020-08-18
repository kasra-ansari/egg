
export const srvTime = time => {
    if(time.length > 0){
        return time.toString().substring(0,4).replace(/\B(?=(\d{2})+(?!\d))/g, ':');
    }
}
