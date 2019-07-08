var mongoose=require('mongoose')

 


var userlist=mongoose.Schema({

    user:{
        type:String
        
    },

    eventname:{
        type:String,
        Default:'Untitled Event'
    },

    eventid:{
        type:Number
    },

    email:{
        type:String
    },

    invitee:{
        type:String
    },

    token:{
        type:String
    },

    status:{
        type:Boolean,
        Default:0
    }
});

module.exports=mongoose.model('userlist',userlist);
 