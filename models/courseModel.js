const mongoose = require('mongoose');

let courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default: 
        "https://soliloquywp.com/wp-content/uploads/2016/08/How-to-Set-a-Default-Featured-Image-in-WordPress.png"
    },
    lessons:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lesson',}
    ],
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    faculty:{
        type:String,
        required:true
    },

},{timestamps:true});

module.exports=mongoose.model('Course',courseSchema);