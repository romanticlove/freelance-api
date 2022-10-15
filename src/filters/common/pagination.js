const defaultParams = {
    limit: 2,
    maxLimit: 500,
    page: 1,
    order: [['id', 'DESC']]
};

module.exports = (params = {}) => {
    let limit = parseInt(params.limit) || defaultParams.limit;
    if (limit > defaultParams.maxLimit)
        limit = defaultParams.limit;

    let page = parseInt(params.page) || defaultParams.page;
    let offset = (page - 1) * limit;
    let order = (params.sort && params.order) && [[params.sort, params.order || 'DESC']];

    return {limit, offset, order}
};