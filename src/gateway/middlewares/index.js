const app = require('./../index');

const secure = require('./secure');
const pagination = require('./extract-pagination');

const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');

const allow = config.cors && config.cors.allow;
app
    .use(cors({
        origin: allow || [],
        credentials: true,
        optionsSuccessStatus: 200
    }))
    .use(bodyParser.json())


module.exports = {
    secure,
    pagination,
};