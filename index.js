const express=require('express');
const bodyparser=require('body-parser');
const cookieparser=require('cookie-parser');
const mongoose=require('mongoose');
const config=require('./config/config').get(process.env.NODE_ENV);

const app=express();

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieparser());

const {User}=require('./models/user');


mongoose.Promise=global.Promise;
mongoose.connect(config.DATABASE,{useNewUrlParser : true, useUnifiedTopology: true })
.then(()=>{
    console.log("database is connected");
}).catch((err)=>{
    console.log(err);
});



const PORT=3000||process.env.PORT;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})