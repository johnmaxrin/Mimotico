var jwt=require('jsonwebtoken');



// JSON SIGN --> Return Token //
function sign(payload,secretkey,duration){
return(jwt.sign(payload,secretkey,{expiresIn:duration}))
}


// JSON VERIFY -->Return Payload//
function verify(token,secretkey){
try{
var decoded=jwt.verify(token,secretkey);
return decoded;
}
catch{
return 0;
}
}


module.exports.verify=verify;
module.exports.sign=sign;