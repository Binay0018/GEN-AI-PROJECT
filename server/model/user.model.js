const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const user = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },  
    email:{
        type: String,
        unique: [true, 'Email already exists'],
        required: true, 
    },
    password: {
        type: String,
        required: true, 
    },

});

user.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    } 
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
   
});

user.methods.comparepassword = async function(
    enteredPassword
){
    return await bcrypt.compare(enteredPassword, this.password);
};



const User = mongoose.model('User', user);

module.exports = User;