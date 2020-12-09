const express=require('express');

const app=express();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETEOPTIONS");
    next();
})

app.use('/app/posts',(req,res,next)=>{
    console.log('second middleware initialised');
    const post=[
        {id:1, title: 'first Post', content: 'This is first post content here'},
        {id:2, title: 'second Post', content: 'This is second post content here'}
    ]
    res.json({message:"posts fetched successful", post:post});
})

module.exports=app