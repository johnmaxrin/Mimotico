var express=require('express')
var router=express.Router()
var event=require('../models/eventmodel')
var mail=require('../api/mailer')
var people=require('../models/userlist')
var block=require('../models/block')
var gblock=require('../api/gblock')

const jwtmdl=require('../api/jwtmiddleware')



router.get('',jwtmdl,(req,res)=>{
    res.render('people')
   gblock.getblock()
})


router.get('/invite/:uid',jwtmdl,(req,res)=>{

    people.findById(req.params.uid,(err,resl)=>{
        
     //Error Handler!
     if(err){
        res.render('./elements/error')
    }
    event.findOne({eventid:resl.eventid},(err,resl2)=>{
        mail.sentmail(resl.email,resl2,resl.invitee)
        res.redirect('/dashboard/manage/'+resl.eventid)

    })


    })

    gblock.updatemailstatustrue(req.params.uid)

});

router.get('/getblock/:uid',jwtmdl,(req,res)=>{

 block.find({pid:req.params.uid},(err,resl)=>{

     //Error Handler!
     if(err){
        res.render('./elements/error')
    }

    console.log(resl)
    res.render('people',{resl})
 })
});



router.get('/delete',jwtmdl,(req,res)=>{
    gblock.removeblock();
})

router.get('/deletepupil/:pid',jwtmdl,(req,res)=>{
    gblock.removepupil(req.params.pid)
    people.find({eventid:req.session.eid},(ee,resl)=>{
        res.render('./elements/manage',{resl})
    })
})
 

router.get('/updatepage/:uid',jwtmdl,(req,res)=>{
   people.findById(req.params.uid,(err,resl)=>{
        //Error Handler!
        if(err){
            res.render('./elements/error')
        }
    res.render('./elements/update',{resl});
   })

    
    
})


router.post('/update/:uid',jwtmdl,(req,res)=>{


    console.log(req.body)
    var data={ 
        id:req.params.uid,
        body:{
            invitee:req.body.invitee,
            email:req.body.email
        }
    }

    gblock.doneupdate(data,res);

})




router.get('/createblock/:pid',jwtmdl,(req,res)=>{
    var data={
        pid:req.params.pid
    }
    gblock.createblock(data)
})

module.exports=router;
 

