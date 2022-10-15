const { db } = require('config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(db);

module.exports = sequelize;