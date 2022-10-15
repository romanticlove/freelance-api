const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db');
const {PROFILE_TYPES} = require("../constants");

class Profile extends Model {}

Profile.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: false
        },
        balance: {
            type: DataTypes.DECIMAL(12, 2)
        },
        type: {
            type: DataTypes.ENUM(Object.values(PROFILE_TYPES))
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
            },
            set(value) {
                throw new Error('Do not try to set the `fullName` value!');
            }
        }
    },
    {
        sequelize,
        modelName: 'Profile',
        tableName: 'Profiles'
    }
);

Profile.associate = function ({Contract, Job}) {
    Profile.hasMany(Contract, {as: 'Contractor', foreignKey: 'ContractorId'})
    Profile.hasMany(Contract, {as: 'Client', foreignKey: 'ClientId'})
};

module.exports = Profile;