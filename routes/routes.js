module.exports=(app)=>{
    const user=require('../controllers/userroutes');
    const blog=require('../controllers/blogroute');

    //user routes
    app.get('/api/auth',user.auth);
    app.get('/api/logout',user.logout);
    app.post('/api/register',user.signup);
    app.post('/api/login',user.login);

    //blog routes

}