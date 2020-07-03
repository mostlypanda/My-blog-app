const User=require('../models/user');
const { json } = require('body-parser');

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

};

exports.logout=function(req,res){

};

exports.auth=function(req,res){

};