const badRequest = (res, message = null, data = {}) => {
    return res.status(400).json({
        message: message || 'Bad request',
        data
    });
}

const unauthorized = (res, message = null) => {
    return res.status(401).json({
        message: message || 'Unauthorized'
    });
}

const forbidden = (res, message = null) => {
    return res.status(403).json({
        message: message || 'Forbidden'
    });
}

const notFound = (res, message = null) => {
    return res.status(404).json({
        message: message || 'Forbidden'
    });
}

const serverError = (res, message = null) => {
    return res.status(500).json({
        message: message || 'Server error'
    });
}

const success = (res, data = {}) => {
    return res.status(200).json(data);
}
module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    serverError,
    notFound,
}