var jwt=require('jsonwebtoken');

var keys=require('../config/keys')



module.exports=function(req,res,next){

    const token= req.session.token;//req.session.token;
    console.log('From JWTMDL '+req.session);
    if(!token){
        res.render('../views/elements/access')
    }
     
    try{
        const verified=jwt.verify(token,keys.secretkey);
        req.session.userstatus=verified;
        if(req.session.user==null){
            res.render('../views/elements/error')
        }
        next();
    }
    catch (err){
        res.render('../views/elements/access')
    }
}