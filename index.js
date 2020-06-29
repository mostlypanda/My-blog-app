const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');

const app=express();

//set bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//set files location
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/pages'));

app.get('/',function(req,res){
    res.render('index');
});

const port=3000||process.env.PORT;
app.listen(port,()=>{
    console.log(`app is live at ${port}`);
});