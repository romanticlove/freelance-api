module.exports = {
    port: process.env.GATEWAY_PORT || 3001,
    cors: {
        allow: [
            'http://localhost:3000',
        ]
    },
    db: {
        dialect: 'sqlite',
        storage: __dirname + '/../../database.sqlite3'
    }
}