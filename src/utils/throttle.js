const throttle = (func,wait) => {
    let timer;
    return () => {
        if(timer) return;
        timer = setTimeout(() => {
            func()
            timer = null 
        },wait)
    }
}
export default throttle