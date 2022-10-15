// Here we can replace console with for example winston logger
module.exports = {
    info(message, meta = {xid: '-'}) {
        console.info(message, meta);
    },
    error(message, meta = {xid: '-'}) {
        console.error(message, meta);
    },
    debug(message, meta = {xid: '-'}) {
        console.debug(message, meta);
    }
}