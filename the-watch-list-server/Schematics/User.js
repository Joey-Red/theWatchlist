mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    movieList: { type: Array, required: true },
    // Favorite Movie
});

module.exports = mongoose.model("User", UserSchema);
