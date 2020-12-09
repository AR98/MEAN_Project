const express=require('express');
const bodyparser=require('body-parser')



const app=express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETEOPTIONS");
    next();
})

app.post('/app/posts',(req,res,next)=>{

    const post=req.body;
    console.log(post);
    res.json({message:"data posted successfully!"})

})
app.get('/app/posts',(req,res,next)=>{
    console.log('second middleware initialised');
    const post=[
        {id:1, title: 'first Post', content: 'This is first post content here'},
        {id:2, title: 'second Post', content: 'This is second post content here'}
    ]
    res.json({message:"posts fetched successful", post:post});
})

module.exports=app