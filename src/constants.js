module.exports = {
    GATEWAY: {
        DEFAULT_PORT: 3001,
        ROUTE_METHODS: {
            GET: 'get',
            POST: 'post',
            PUT: 'put',
            DELETE: 'delete',
        },
        CONTROLLERS_FOLDER: __dirname + '/controllers'
    },
    PROFILE_TYPES: {
        CONTRACTOR: 'contractor',
        CLIENT: 'client'
    },
    CONTRACT_STATUSES: {
        NEW: 'new',
        IN_PROGRESS: 'in_progress',
        TERMINATED: 'terminated',
    }
}