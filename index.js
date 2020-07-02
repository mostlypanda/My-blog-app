const express=require('express');
const bodyparser=require('body-parser');
const cookieparser=require('cookie-parser');
const mongoose=require('mongoose');

const app=express();


const PORT=3000||process.env.PORT;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})