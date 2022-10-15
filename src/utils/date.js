const setUTCEnd = (date) => {
    return date.setUTCHours(23,59,59,999);
}

const setUTCStart = (date) => {
    return date.setUTCHours(0,0,0,0);
}

module.exports = {
    setUTCStart,
    setUTCEnd,
}