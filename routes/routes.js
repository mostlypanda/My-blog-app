module.exports=(app)=>{
    const user=require('../controllers/userroutes');
    const blog=require('../controllers/blogroute');
    const {auth} =require('../controllers/auth');

    //user routes
    app.get('/api/auth',user.auth);
    app.post('/api/register',user.signup);
    app.post('/api/login',user.login);
    app.get('/api/logout',auth,function(req,res){
        req.user.deleteToken(req.token,(err,user)=>{
            if(err) return res.status(400).send(err);
            res.sendStatus(200);
        });
    });
    //blog routes

}