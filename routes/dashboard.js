var express=require('express')
var moment=require('moment');
var router=express.Router()
var random=require('random')
var jwt=require('jsonwebtoken')
var event=require('../models/eventmodel')
var userlist=require('../models/userlist')
var mail=require('../api/mailer')
var generatepdf=require('../api/generatepdf')
var gblock=require('../api/gblock')
var random=require('random-number')
const jwtmdl=require('../api/jwtmiddleware')

 
router.get('/',jwtmdl,(req,res,next)=>{

    var sess=req.session;
    console.log('****************REQ USER*************'+sess.user)
    event.find({username:req.session.user},(err,data)=>{

        //Error Handler!
        if(err){
            res.render('./elements/error')
        }


        //console.log(data.length)
        res.render('home',{data:data,name:req.session.user});
    })
})


router.get('/create',jwtmdl,(req,res)=>{
    
    res.render('./elements/genform')
})

 
/********************************INVITE******************************************/
router.get('/eventadd/:eid',jwtmdl,(req,res)=>{

    event.findOne({eventid:req.params.eid},(err,resl)=>{
         //Error Handler!
        if(err){
            res.render('./elements/error')
        }
        if(resl)
        {
            var data={}
            data=resl
            res.render('./elements/addform',{data})
           
        }
        
        else{
            res.render('./elements/error')
        }
      
    })

     });


 

//*******************************SEND****************************************//
router.post('/send/:eid',jwtmdl,(req,res)=>{
    var i=0;
    
    var options = {
        min:  99999
      , max:  1000000
      , integer: true
      }

      
    event.findOne({eventid:req.params.eid},(err,resl)=>{

         //Error Handler!
         if(err){
            res.render('./elements/error')
        }
       
        console.log(req.body)


        req.body.email.forEach(element => {

            var name='';
            var email='';
            var token='';
            var data={};

            var fname=random(options);
            name=req.body.firstname[i]+' '+req.body.lastname[i];
            email=req.body.email[i]
            data={name:name,email:email}
             
            token=jwt.sign({data},req.params.eid.toString(),{expiresIn:resl.duration});
            generatepdf.generatepdf(resl.eventname,token,name,resl.message,fname)
            mail.sentmail(email,resl,fname)

            var userli=new userlist({
                user:req.session.user,
                eventname:resl.eventname,
                eventid:resl.eventid,
                email:email,
                invitee:name,
                token:token,
                status:0
                    },resl.eventname);
            

                    

            userli.save((err,data)=>{


                console.log('Saved Data'+data);

                gblock.creategblock(data);
               
               
                
                // res.send(data)
            });

            i++;

        });


        res.render('./elements/emailsuccess',{resl});
    })
    
})

 

router.get('/delete/:eid',jwtmdl,(req,res)=>{



 //res.render('elements/manage')

// userlist.find({},(err,resl)=>{
//     res.send(resl);
// })
     
 console.log(req.params.eid)

     event.remove({eventid:req.params.eid},(err,resl)=> {
          //Error Handler!
        if(err){
            res.render('./elements/error')
        }


        userlist.remove({eventid:req.params.eid},(err,resl)=>{

             //Error Handler!
        if(err){
            res.render('./elements/error')
        }
           
            res.redirect('/dashboard')
        })
    /*event.find({user:'Rinku'},(err,res)=>{
        console.log(res[0])
    })*/
})


});


router.get('/manage/:eid',jwtmdl,(req,res)=>{

    req.session.eid=req.params.eid
    userlist.find({eventid:req.params.eid},(err,resl)=>{
        console.log(resl.length);
        res.render('./elements/manage',{resl})
    })

   // res.render('./elements/manage',{data:{},name:'Rinku'})



})




router.post('/eventsuccess',jwtmdl,(req,res)=>{
     var eventdata=req.body;
       
    console.log(req.session)
        if(req.body!=''){
    
            var options = {
                min:  99999
              , max:  1000000
              , integer: true
              }
    
            var id=random(options);
             
            
            
            var newevent=new event({
                username:req.session.user,
                eventname: eventdata.eventname,
                 address:{
                     building:eventdata.building,
                     city:eventdata.city,
                     state:eventdata.state,
                     zip:eventdata.pincode
                 },
    
                 date:eventdata.date,
                 message:eventdata.message,
                 eventid:id,
                 duration:Math.floor(duration(eventdata.date)) 
    
            });

    
            newevent.save((err,event)=>{
                 //Error Handler!
        if(err){
            res.render('./elements/error')
        }
                else

                res.render('./elements/eventsuccess',{event});
            })
     //////////////////////////////////////////////////////////////////
            
     
        }
    
})




 
//Remaining Duration///////////////////////////////////////////////
function duration(endtime)
{
    var starttime=moment();
    var duration=moment.duration(moment(endtime).endOf('Day').diff(starttime));
    var secondsremaining=duration.asSeconds();
    return secondsremaining;
}

///////////////////////////////////////////////////////////////////

module.exports=router;