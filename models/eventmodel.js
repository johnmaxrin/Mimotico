/*

Event Model

1.Event Name
2.Address { 2.1 Building Name | 2.2 City | 2.3 State | 2.4 Zip }
3.Date
4.Message
5.Event ID
6.Attendance
7.Time Left for Expiry (Duration)
8.Username


*/



var mongoose=require('mongoose')

var event=mongoose.Schema({

  eventname: {
      type:String,
      required:'Required!'
  },

  address:{
    building: String,
    city:String,
    state:String,
    zip:Number
  },

  date:{
      type:String,
      required:'Required!'
  },

  message:{
    type:String,
    required:'Required!'
  },

  eventid:{
      type:String,
      required:'Required!'
  },

  attendance:{
      default:0,
      type:Number,
  },

  duration:{
      type:Number,
  },

  username:{
      type:String,
      required:'Required!'
  }
});



module.exports=mongoose.model('Userevent',event);
 