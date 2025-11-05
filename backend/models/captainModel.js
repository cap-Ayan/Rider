const {Schema, model} = require('mongoose');



const captainSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false // Exclude password from query results by default
    },
    socketId: {// For real-time features like live tracking
        type: String,
        default: null
    },
   status:{
    type:String,
    enum:['available','unavailable'],
    default:'unavailable'
   },
   vehicle:{
    plate:{
        type:String,
        required:true,
        minlength:[3,'Plate number must be at least 3 characters long']
    },
    capacity:{
        type:Number,
        required:true,
        min:[1,'Capacity must be at least 1']
    },
    type:{
        type:String,
        required:true,
        enum:['car','bike','auto'],
        default:'car'
   }
},
location:{
    lat:{
        type:Number,
       
    },
    lng:{
        type:Number,
       
    }
}
});



const captainModel = model('Captain', captainSchema);

module.exports = captainModel;