const express=require('express');
const bodyparser=require('body-parser')
const Post=require('./Models/post')
const connection=require('./connection');
const router=require('./routes/Post')
const multer=require('multer');
const path=require('path');
const app=express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use("/images",express.static(path.join('./backend/images')))
connection();


const MIME_TYPE_MAP={
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage= multer.diskStorage({
    destination: (req,file,cb)=>{
        const invalid= MIME_TYPE_MAP[file.mimetype];
        let err=new Error('invalid ime type');
        if(err)
{
    err=null
}        cb(null,'./backend/images')
    },
    filename: (req,file,cb)=>{
        const  name= file.originalname.toLocaleLowerCase().split(' ').join('-');
        const ext= MIME_TYPE_MAP[file.mimetype]
        cb(null, name+'-'+Date.now()+'.'+ext)
    }
})



app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    next();
})

app.post('/app/posts',multer({storage: storage}).single("image"),(req,res,next)=>{
console.log('post method called')
const url= req.protocol+'://'+ req.get("host");
    const post=new Post({
        title: req.body.title,
        content: req.body.content,
        image: url+"/images/"+req.file.filename
    }
    )
// Storing post in Db
    post.save().then(res=>console.log('successfully saved data in db')).catch(err=>console.log('somthing went wrong'))
   
    res.json({message:"data posted successfully!",post:post})

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

    app.put('/app/posts/:id',multer({storage: storage}).single("image"),(req,res,next)=>{
        const url= req.protocol+'://'+ req.get("host");
       let image= url+"/images/"+req.file.filename
       // console.log('in put method '+ req.file.filename);
        // const post=new Post({
        //     title: req.body.title,
        //     content: req.body.content
        // })

    Post.updateOne({_id:req.params.id},{$set: { title: req.body.title, content: req.body.content, image: image} })
    .then(data=>res.json({message: "successfully Updated"}))
    .catch(data=>console.log('somthing went wrong with update query'))
        
    } )

app.use("/app/posts",router)

module.exports=app