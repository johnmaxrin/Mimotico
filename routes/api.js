const express=require('express')
const router=express.Router()
const user=require('../models/userlist')
const event=require('../models/eventmodel')
const gblock=require('../api/gblock')
const moment=require('moment')


router.get('/hi',(req,res)=>{
    res.send({hi:'Hello'})
})

router.get('/getuser/:token',(req,res)=>{
user.findOne({token:req.params.token},(err,resl)=>{
    if(err){
        res.send(0)
    }
    res.send(resl)
})
})




router.get('/getevent/:eventid',(req,res)=>{

    var eventid=req.params.eventid
    console.log('Event ID:'+eventid)
    event.findOne({eventid:eventid},(err,resl)=>{
        if(err){
            res.send(0)
        }
        res.send(resl)
    })
})


router.post('/updateuser/:token',(req,res)=>{


var token=req.body.status
console.log(token.toString())

  


    user.findOneAndUpdate({token:req.params.token},{status:req.body.status,venue:req.body.venue},{new: true},(err,resl1)=>{
        if(err){
            res.send(500)

            console.log(err)
        }

        console.log("First One "+resl1)
        res.send(resl1);
    });

    user.findOne({token:req.params.token},(err,resl)=>{

        if(err){
            res.send(0)
        }
 
        var cstatus='Out'
        if(resl.status){
            cstatus='In'
        }

        var data={
            pid:resl.id,
            timestamp:moment().format('DD-MM-YY | hh:mm:ss'),
            pupilname:resl.invitee,
            email:resl.email,
            action:cstatus,
            at:req.body.venue

        }
        gblock.createblock(data);
        
    })
})
module.exports = router;















/*

   if (error instanceof NetworkError) {
                    qrcoderes.setText("EROOR BUDDY! 124");
                }

               if (error instanceof NoConnectionError) {
                    qrcoderes.setText("Connection Error! ");
                }

               if (error instanceof ServerError) {
                    qrcoderes.setText("Server Error! ");
                }

             else if (error instanceof AuthFailureError) {
                    qrcoderes.setText("Auth Fail ");
            }

            else if (error instanceof TimeoutError) {
                    qrcoderes.setText("Time Out !");
            }


            */