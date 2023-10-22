const mongoose = require('mongoose');

let lessonSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:false,
    },
    content:{
        type:String,
        required:true,
    },
    video:{
        type:String,
    },
  

},{timestamps:true});

module.exports =mongoose.model('Lesson',lessonSchema);