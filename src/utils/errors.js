class NotFoundError extends Error {
    constructor(message) {
        super();
        this.message = message
    }
}
class BadRequest extends Error {
    constructor(message, data = null) {
        super();
        this.message = message;
        this.data = data;
    }
}
class InsufficientFunds extends BadRequest {
    constructor(message = 'Insufficient funds', data = null) {
        super(message, data);
    }
}

module.exports = {
    NotFoundError,
    BadRequest,
    InsufficientFunds,
}