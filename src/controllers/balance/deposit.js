const {getUnpaidAmount} = require("../../services/jobs");
const {changeBalance, getProfileById} = require("../../services/profile");
const {validation: {compileSchema}} = require('./../../utils');
const {BadRequest, NotFoundError} = require("../../utils/errors");
const {PROFILE_TYPES} = require("../../constants");

const VALIDATION_SCHEMA = {
    userId: {type: "number", integer: true, positive: true, convert: true},
    amount: {type: "number", integer: true, positive: true, convert: true},
}

const action = async (params) => {
    const user = await getProfileById(params.userId);
    if(!user || user.type !== PROFILE_TYPES.CLIENT) {
        throw new NotFoundError(`User you want to adjust balance is not a client or absent in system`)
    }
    const unpaidAmount = await getUnpaidAmount(params.userId);
    if(unpaidAmount <= 0 || params.amount > 0.25 * unpaidAmount) {
        throw new BadRequest(`Deposit amount should be less than 25% of unpaid jobs amount`, {
            unpaidAmount
        })
    }

    const isDeposited = await changeBalance(params.userId, params.amount);
    return {success: isDeposited};
}

action.schema = compileSchema(VALIDATION_SCHEMA);

module.exports = action