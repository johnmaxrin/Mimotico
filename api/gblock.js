
var md5=require('md5')
var moment=require('moment')
var people=require('../models/userlist')
var block=require('../models/block')


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
people.findByIdAndUpdate(data.id,data.body,(err,resl)=>{
    

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
    })
}


module.exports.doneupdate=doneupdate;
module.exports.createblock=createblock;
module.exports.getblock=getblock;
module.exports.removepupil=removepupil;
module.exports.removeblock=removeblock;
module.exports.creategblock=creategblock;