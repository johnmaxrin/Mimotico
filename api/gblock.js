
var md5=require('md5')
var moment=require('moment')
var people=require('../models/userlist')
var block=require('../models/block')
var event=require('../models/eventmodel')
var pdf=require('../api/generatepdf')


function getblock(){
    block.find({},(err,resl)=>{
        console.log(resl);
    })
}



function removepupil(id){
    people.findByIdAndRemove(id,(err,res)=>{
        console.log('Pupil Deleted!')
    })

    block.findByIdAndRemove(id,(err,res)=>{
        console.log('Block Deleted!')
    })
}

function removeblock(){
    block.remove({},(err,resl)=>{
        console.log(resl+' Block Deleted!')
    })
}


function creategblock(pdata){
    var data={
        pid:pdata.id,
        name:pdata.invitee,
        timestamp:moment().format('DD-MM-YY | hh:mm:ss'),
        action:'Generated',
        email:pdata.email
        
    }

    var hash=md5(data.id+data.timestamp+data.action)
 
    var newblock=new block({
        pid:data.pid,
        pupilname:data.name,
        hash:hash,
        prevhash:'0',
        timestamp:data.timestamp,
        action:data.action,
        email:data.email 
    });

    newblock.save((err,resl)=>{
        if(err){
            console.log(err)
        }

        console.log('Blockmined!!!')
    })

    
}


function createblock(data){


block.findOne({pid:data.pid}, {}, { sort: { '_id' : -1 } }, (err,resl)=>{

    console.log('Create Block | '+resl.pid)

    var hash=md5(data.id+data.timestamp+data.action)
     var newblock=new block({
        pid:data.pid,
        pupilname:data.pupilname,
        hash:hash, 
        prevhash:resl.hash,
        timestamp:data.timestamp,
        action:data.action,
        email:data.email,
        at:data.at 
     })

     newblock.save((err,res)=>{

        if(err){
            throw err
        }
         console.log('Block Mined!'+res)
     })
    console.log('Sorted!! '+resl+' '+data.pid);
})

    
}



function doneupdate(data,res){
    let eventid;
    let eventid2;
    let tokenz;
     
people.findByIdAndUpdate(data.id,data.body,(err,resl)=>{
    
    
   
    

    tokenz=resl.token;
    
    block.findOneAndUpdate({pid:data.id},{pupilname:data.body.invitee,email:data.body.email},(err,resll)=>{
        var data2={
            pid:data.id,
            pupilname:data.body.invitee,
            email:data.body.email,
            timestamp:moment().format('DD-MM-YY | hh:mm:ss'),
            action:'Updated!',
        }

        createblock(data2);
            res.render('./elements/updatesuccess',{resl})
    })


    event.findOne({eventid:resl.eventid},(err,resl3)=>{

        console.log('of Update! 2 '+resl3)
        if(err) console.log(err)
    pdf.generatepdf(resl3.eventname,tokenz,data.body.invitee,resl3.message,data.body.invitee);
    })


    })
    


    updatemailstatusfalse(data.id)
}


function updatemailstatustrue(uid){
people.findByIdAndUpdate(uid,{mailstatus:true},(err,resl)=>{
if(err) console.log(err)
console.log('Mail Updated!! '+resl)
})

}


function updatemailstatusfalse(uid){
    people.findByIdAndUpdate(uid,{mailstatus:false},(err,resl)=>{
    if(err) console.log(err)
    console.log(resl)
    })
}


module.exports.updatemailstatustrue=updatemailstatustrue;
module.exports.updatemailstatusfalse=updatemailstatusfalse;
module.exports.doneupdate=doneupdate;
module.exports.createblock=createblock;
module.exports.getblock=getblock;
module.exports.removepupil=removepupil;
module.exports.removeblock=removeblock;
module.exports.creategblock=creategblock;