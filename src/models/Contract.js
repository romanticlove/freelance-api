const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db');
const {CONTRACT_STATUSES} = require("../constants");

class Contract extends Model {
}

Contract.init({
    terms: {
        type: DataTypes.TEXT, allowNull: false
    }, status: {
        type: DataTypes.ENUM(Object.values(CONTRACT_STATUSES))
    },
}, {
    sequelize, modelName: 'Contract', tableName: 'Contracts'
});

Contract.associate = function ({Profile, Job}) {
    Contract.belongsTo(Profile, {as: 'Contractor'})
    Contract.belongsTo(Profile, {as: 'Client'})
    Contract.hasMany(Job);
};

Contract.addScopes = function ({Job}) {
    Contract.addScope('withJobs', jobsWhere => ({
        include: [{
            attributes: [], model: Job, duplicating: false, where: jobsWhere, required: true,
        }]
    }))
}

module.exports = Contract;
