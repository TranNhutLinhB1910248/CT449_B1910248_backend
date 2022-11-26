const { model, Schema, Schema: { Types: { ObjectId } } } = require("mongoose");

const postSchema = new Schema({
    name: {
        type: String,
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    price: {
        type: Number,
    },
    detail: {
        type: String,
    },
    image: {
        type: Object,
    },
    created: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = model("Product", postSchema);