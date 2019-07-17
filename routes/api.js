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


router.post('/updateuser',(req,res)=>{
    user.findOneAndUpdate({token:req.body.token},{status:req.body.status},(err,resl)=>{
        if(err){
            res.send(0)
        }
        res.send(resl);
    });

    user.findOne({token:req.body.token},(err,resl)=>{

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