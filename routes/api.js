const express=require('express')
const router=express.Router();
const user=require('../models/userlist')
const event=require('../models/eventmodel')
const gblock=require('../api/gblock')
const moment=require('moment')



router.get('/:token',(req,res)=>{
user.findOne({token:req.params.token},(err,resl)=>{
    if(err){
        res.send(0)
    }
    res.send(resl)
})
})

router.get('/:eventid',(req,res)=>{
    event.findOne({eventid:req.params.eventid},(err,resl)=>{
        if(err){
            res.send(0)
        }
        res.send(resl)
    })
})


router.post('/update/:token',(req,res)=>{
    user.findOneAndUpdate({token:req.params.token},{status:req.body.status},(err,resl)=>{
        if(err){
            res.send(0)
        }
        res.send(resl);
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