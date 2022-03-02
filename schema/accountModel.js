const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
    result: String,
    policy: {
        id: String,
        name: String,
        value: String,
    },
});

module.exports = mongoose.model("Policy", policySchema);