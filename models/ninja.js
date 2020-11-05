const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create ninja Schema and model
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required"]
    },
    rank: {
        type: String
    }, 
    available: {
        type: Boolean,
        deafult: false
    }
});

//model now
const Ninja = mongoose.model("ninja", NinjaSchema); //ninja is the collection name, it will create a collection of ninjas (note s)

//export this model
module.exports = Ninja;