const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    chats: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    }]
});

userSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }

        user.password = hashedPassword;
        next();
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            cb(err);
        }

        cb(null, isMatch);
    })
}

const User = mongoose.model('User', userSchema);

module.exports = User;
