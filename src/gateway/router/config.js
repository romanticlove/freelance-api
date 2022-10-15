const {
    PROFILE_TYPES,
    GATEWAY: {
        ROUTE_METHODS: {GET, POST}
    }
} = require('./../../constants');

module.exports = {
    contracts: {
        getById: {
            method: GET,
            alias: '/contracts/:id',
            secure: true,
        },
        getAll: {
            method: GET,
            alias: '/contracts',
            secure: true,
            pagination: true
        },
    },
    jobs: {
        getUnpaid: {
            method: GET,
            alias: '/jobs/unpaid',
            secure: true,
            pagination: true
        },
        pay: {
            method: POST,
            alias: '/jobs/:job_id/pay',
            secure: {
                profileType: PROFILE_TYPES.CLIENT
            },
        }
    },
    balance: {
        deposit: {
            method: POST,
            alias: '/balances/deposit/:userId',
            secure: true,
        }
    },
    admin: {
        bestProfession: {
            method: GET,
            alias: '/admin/best-profession',
            secure: true,
        },
        bestClients: {
            method: GET,
            alias: '/admin/best-clients',
            secure: true,
            pagination: true,
        }
    }
};