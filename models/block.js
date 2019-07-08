var mongoose=require('mongoose')

var block=mongoose.Schema({


    pid:{
        type:String,
        required:'Required!'
    },

    pupilname:{
        type:String,
        required:'Required!'
    },
    hash:{
        type:String,
        required:'Required!'
    },

    prevhash:{
        type:String,
        required:'Required!'
    },

    timestamp:{
        type:String,
        required:'Required!'
    },

    action:{
        type:String,
        required:'Required!'
    },

    at:{
        type:String,
        default:'MicoHQ'
    },

    email:{
        type:String,
        required:'Required!'
    }
})

module.exports=mongoose.model('block',block);