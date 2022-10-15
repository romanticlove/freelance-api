const Validator = require("fastest-validator");

const compileSchema = (schema) => {
    const validator = new Validator();
    return validator.compile(schema);
}

const pagination = {
    pagination: {
        type: "object",
        optional: true,
        props: {
            limit: { type: "number", positive: true, integer: true, optional: true },
            page: { type: "number", positive: true, integer: true, optional: true },
            sort: { type: "string", optional: true },
            order: { type: "string", optional: true },
        }
    }
}

module.exports = {
    pagination,
    compileSchema
}