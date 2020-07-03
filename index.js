const express=require('express');
const bodyparser=require('body-parser');
const cookieparser=require('cookie-parser');
const mongoose=require('mongoose');
const config=require('./config/config').get(process.env.NODE_ENV);

const app=express();

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieparser());


mongoose.Promise=global.Promise;
mongoose.connect(config.DATABASE,{useNewUrlParser : true, useUnifiedTopology: true })
.then(()=>{
    console.log("database is connected");
}).catch((err)=>{
    console.log(err);
});

app.get('/',(req,res)=>{
    res.json({"message": "welcome to this blog app"});
});

require('./routes/routes')(app);



const PORT=3000||process.env.PORT;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})