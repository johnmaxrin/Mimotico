var nodemailer=require('nodemailer');

    function sentmail(mail,req,fname){

        var trasnport = nodemailer.createTransport({

            service: 'gmail',
            auth: {
              user: 'ksamuelrobert@gmail.com',
              pass: '28284211dnsntj'
            }
        });

         
        var mailop={
            from:'ksamuelrobert@gmail.com',
            to:mail,
            subject:req.eventname,
            text:req.message,
            attachments:[{
                filename: 'MimoticoID.pdf',
                path: './PDFs/'+fname+'MimoticoID.pdf'
            }]
            };


        trasnport.sendMail(mailop,(err,info)=>{
            if(err)throw err;
        
            console.log('Email Sent'+info);
            res.send('Success!');
        });
    }

    module.exports.sentmail=sentmail;
   