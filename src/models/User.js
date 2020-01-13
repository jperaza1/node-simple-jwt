const { Schema, model } = require('mongoose');
const bcrypt =require('bcryptjs');

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    create_at:{ type: Date, default: Date.now }
});

userSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);

};


userSchema.methods.validatePassword = function (password)  {
    return bcrypt.compare(password, this.password);
}

module.exports = model('user', userSchema);