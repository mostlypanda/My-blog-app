const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');

const app=express();

//set bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//set files location
app.use(express.static(__dirname+'/public'));


app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

app.get('/about',function(req,res){
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
})

app.get('/contact',function(req,res){
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
})
app.get('/post',function(req,res){
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
})
const port=3000||process.env.PORT;
app.listen(port,()=>{
    console.log(`app is live at ${port}`);
});