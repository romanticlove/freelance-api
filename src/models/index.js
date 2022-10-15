const sequelize = require('./db');

const Profile = require('./Profile');
const Contract = require('./Contract');
const Job = require('./Job');

const models = {
    Profile,
    Contract,
    Job
};

Object.keys(models).forEach(function (modelName) {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }

    if (models[modelName].addScopes) {
        models[modelName].addScopes(models);
    }
});

module.exports = {
    sequelize,
    ...models,
};