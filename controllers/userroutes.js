const User=require('../models/user');
const auth =require('../controllers/auth');
const confiq=require('../config/config').get(process.env.NODE_ENV);
const nodemailer=require('nodemailer');
const user = require('../models/user');
const bcrypt=require('bcrypt');
const Blog=require('../models/blog');

// signup user
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


// login user
exports.login=function(req,res){

    User.findOne({'email':req.body.email},function(err,user){
        if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});

        user.comparepassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});

        user.generateToken((err,user)=>{
            if(err) return res.status(400).send(err);
            res.cookie('auth',user.token).json({
                isAuth : true,
                id : user._id
                ,email : user.email
            })
        })    
    })
  })
};

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
//console.log(otp);
 // forgot password           
exports.forgotpassword=function(req,res){
    const Email= req.body.email;

    User.findOne({email:Email},function(err,user){
        if(err||!user) return res.status(400).json({message :"User doesn't exits"})


        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service : 'Gmail',
            
            auth: {
              user: 'sarthakmittal1461@gmail.com',
              pass: 'S@rth@k09',
            }
            
          });
            
          // send mail with defined transport object
          var mailOptions={
             to: req.body.email,
            subject: "Otp for reset password is: ",
            html: "<h3>OTP for password rest is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>"+"<br>"+"<h3>Your previous password is</h3>"+"<h2>"+user.password+"</h2>"  // html body
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      
            res.status(400).json({message :"an email has been sent"});
        });
            
    });

}

exports.getUser=function(req,res){
    const id=req.query.id;

    User.findById(id,function(err,doc){
        if(err) return res.status(400).send(err);
        res.status(200).json({
            name: doc.firstname+" "+doc.lastname

        });
    });
};


exports.userblogs=function(req,res){
    Blog.find({_id : req.query.id}).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
}
