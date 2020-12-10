const express=require('express');
const bodyparser=require('body-parser')
const Post=require('./Models/post')
const connection=require('./connection');


const app=express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
connection();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    next();
})

app.post('/app/posts',(req,res,next)=>{
console.log('post method called')
    const post=new Post({
        title: req.body.title,
        content: req.body.content
    }
    )
// Storing post in Db
    post.save().then(res=>console.log('successfully saved data in db')).catch(err=>console.log('somthing went wrong'))
    console.log(post);
    res.json({message:"data posted successfully!"})

})

app.get('/app/posts',(req,res,next)=>{
    console.log('second middleware initialised');
     
    Post.find().then(data=>{

        console.log(data);

        res.json({message:"posts fetched successful", post:data});
       }).catch(err=>console.log("somthing wrong went with fetching query"))
   
    })

    app.delete('/app/posts/:id',(req,res,next)=>{

        Post.deleteOne({_id: req.params.id}).then(data=>console.log('Successfully deleted post')).catch(err=>console.log('somthing went wrong with delete query'))

        res.json({message: "successfully deleted"})
    })

    app.put('/app/posts/:id',(req,res,next)=>{
        console.log('in put methos'+ req.body.title);
        // const post=new Post({
        //     title: req.body.title,
        //     content: req.body.content
        // })

    Post.updateOne({_id:req.params.id},{$set: { title: req.body.title, content: req.body.content} })
    .then(data=>console.log('Updated post sunccessfully'))
    .catch(data=>console.log('somthing went wrong with update query'))
        res.json({message: "successfully Updated"})
    } )

module.exports=app