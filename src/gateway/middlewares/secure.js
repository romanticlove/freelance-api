const {logger} = require('./../../utils');
const {getProfileById} = require("../../services/profile");
const {expressResponses: {unauthorized, forbidden, serverError}} = require("../../utils");

module.exports = (secureConfig) => async (req, res, next) => {
    try {
        const profileId = req.get('profile_id');
        if (!profileId) {
            return unauthorized(res)
        }
        // TODO: It's quite slow operation. Better to move "sessions" into redis
        const profile = await getProfileById(profileId)
        if(!profile) {
            return unauthorized(res)
        }

        if(typeof secureConfig === 'object') {
            if(secureConfig.profileType && secureConfig.profileType !== profile.type) {
                return forbidden(res)
            }
        }

        req.params.__session = profile.toJSON();

        return next();
    } catch (err) {
        logger.error(`Failed to authorize user`, {xid:'-', err})
        return serverError(res)
    }
}