const user=require('../models/user');

let auth=function(req,res,next){
    let token=req.cookies.auth;

    user.findByToken(token,(err,user)=>{
        if(err) throw err;
        
        if(!user) return res.json({error : true});
        
        req.token=token;
        req.user=user;
        next();
    })
}

module.exports={auth};