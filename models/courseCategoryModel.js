const mongoose = require('mongoose');
let courseCategorySchema = new mongoose.Schema({
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
image:{
    type:String,
    default: 
    "https://soliloquywp.com/wp-content/uploads/2016/08/How-to-Set-a-Default-Featured-Image-in-WordPress.png"
},
courses:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Course',
    }
],
},{
    timestamps:true,
}
);

module.exports =mongoose.model('CourseCategory',courseCategorySchema);