const {Schema, model} = require('mongoose');



const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: {
        //     validator: function(v) {
        //         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid email!`
        // }
    },
    password: {
        type: String,
        required: true,
        select: false // Exclude password from query results by default
    },
   
    socketId: {// For real-time features like live tracking
        type: String,
        default: null
    }
});



const userModel = model('User', userSchema);

module.exports = userModel;

