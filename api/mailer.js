const mailgun = require("mailgun-js");
var path=require('path')
 


 function sentmail(mail,req,fname){

    
    const DOMAIN = 'sandboxab3184ff41ea4d5c8a4b38fedbb460d3.mailgun.org';
    const mg = mailgun({apiKey: '9c453aa580d565050652ac2a1756248e-afab6073-81d7a3cc', domain: DOMAIN});
   
    

    const data = {
        from: 'Mimotico HQ<me@samples.mailgun.org>',
        to: mail,
        subject: 'Your Mimotico ID for '+req.eventname, 
        text: req.message,
        attachment:path.join('./PDFs',fname+'MimoticoID.pdf')
    };
    mg.messages().send(data, function (error, body) {
       
    });

}























// var nodemailer=require('nodemailer');

//     function sentmail(mail,req,fname){

//         var trasnport = nodemailer.createTransport({

//             service: 'gmail',
//             auth: {
//               user: 'ksamuelrobert@gmail.com',
//               pass: '28284211dnsntj'
//             }
//         });

         
//         var mailop={
//             from:'ksamuelrobert@gmail.com',
//             to:mail,
//             subject:req.eventname,
//             text:req.message,
//             attachments:[{
//                 filename: 'MimoticoID.pdf',
//                 path: './PDFs/'+fname+'MimoticoID.pdf'
//             }]
//             };


//         trasnport.sendMail(mailop,(err,info)=>{
//             if(err)throw err;
        
//             console.log('Email Sent'+info);
//             res.send('Success!');
//         });
//     }

  module.exports.sentmail=sentmail;
   