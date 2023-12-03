const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: false,
        default: "https://static.vecteezy.com/system/resources/previews/008/302/416/non_2x/eps10-blue-user-solid-icon-or-logo-in-simple-flat-trendy-modern-style-isolated-on-white-background-free-vector.jpg"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    isTeacher: {
        type: Boolean,
        required: true,
        default: false
    },
    faculty: {
        type: String,
        required: true
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course',
            }
    ],
},{
    timestamps: true,
});

/*Password Encryption*/
userSchema.pre('save', async function(next) {
    const Salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,Salt);
    next();
});

/*Password Check*/
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


module.exports = mongoose.model('User', userSchema);
