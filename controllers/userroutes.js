const User=require('../models/user');
const auth =require('../controllers/auth');

exports.signup=function(req,res){
    const newuser=new User(req.body);
    console.log(newuser);

    if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
    
    User.findOne({email:newuser.email},function(err,user){
        if(user) return res.status(400).json({ auth : false, message :"user exits"});

        newuser.save((err,doc)=>{
            if(err) {console.log(err);
                return res.status(400).json({ success : false});}
            res.status(200).json({
                succes:true,
                user : doc
            })
        })
    })
};

exports.login=function(req,res){

    User.findOne({email : req.body.email},function(err,user){
        if(!user) return res.status(400).json({isAuth: false, message:"Auth failed, email not found"});

        user.comparepassword(req.body.password,function(err,isMatch){
            if(!isMatch) return res.status(400).json({isAuth: false, message:"password doesn't match"});
        });
        
        user.generateToken(function(err,user){
            if(err) return res.status(400).send(err);
            res.cookie('auth',user.token).json({
                isAuth : true,
                id : user._id,
                email: user.email
            });
        });
    });
};

exports.logout=function(req,res){

};

exports.auth=function(req,res){

};