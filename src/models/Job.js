const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db');
const Sequelize = require("sequelize");

class Job extends Model {}

Job.init(
    {
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        paid: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        paymentDate: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize,
        modelName: 'Job',
        tableName: 'Jobs'
    }
);

Job.associate = function ({Contract}) {
    Job.belongsTo(Contract)
};

module.exports = Job;