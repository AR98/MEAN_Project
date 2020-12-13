const express=require('express');
const bodyparser=require('body-parser')
const Post=require('./Models/post')
const User=require('./Models/user')
const connection=require('./connection');
const bcrypt=require('bcrypt')
//const router=require('./routes/Post')
const multer=require('multer');
const path=require('path');
const jwt=require('jsonwebtoken')
const checkAuth=require("./check-auth")
//const userRoute=require('./routes/user');

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
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    next();
})

app.post('/app/posts',checkAuth,multer({storage: storage}).single("image"),(req,res,next)=>{
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
     const pageSize=  +req.query.pageSize
     const currentPage= +req.query.currentPage
 let fetchPosts
    const postQuery=Post.find()
    if(pageSize && currentPage){
        postQuery.skip(pageSize*(currentPage-1))
        .limit(pageSize)
    }
    
    postQuery.then(data=>{
        fetchPosts=data
        console.log(fetchPosts)
        return Post.countDocuments()
       
    }).then(count=>{

       // console.log(data);

        res.json({message:"posts fetched successful", post:fetchPosts,maxPosts:count});
       }).catch(err=>console.log("somthing wrong went with fetching query "+err))
   
    })

    app.delete('/app/posts/:id',checkAuth,(req,res,next)=>{

        Post.deleteOne({_id: req.params.id}).then(data=>console.log('Successfully deleted post')).catch(err=>console.log('somthing went wrong with delete query'))

        res.json({message: "successfully deleted"})
    })

    app.put('/app/posts/:id',checkAuth,multer({storage: storage}).single("image"),(req,res,next)=>{
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

  app.post('/app/user/signUp',(req,res,next)=>{
      console.log('in post user singup')
    console.log(req.body)
    bcrypt.hash(req.body.password, 10).then(hash=>{

        const user=new User({
            email: req.body.email,
            password: hash
        })
            user.save().then(result=>{
                res.json({message: "user saved successfully",result:result})
            })
       }).catch(err=>{
           console.log(err);
        res.json({err:err})
    })
   
    })

    app.post('/app/user/login',(req,res,next)=>{
        console.log("login called "+ req.body.email)
        let fetchedUser;
        User.findOne({email:req.body.email})
        .then(user=>{
            console.log(user)
            if(!user){
                return res.json({message: "Auth failed to find user"})
            }
            fetchedUser=user
            return bcrypt.compare(req.body.password,user.password)
        }).then(
            result=>{
                if(!result){
                    return res.json({message: "Auth failed to match password"})
                }  

                const token=jwt.sign({email: fetchedUser.email, userId: fetchedUser._id},
                    "secret_this_shoud_be_longer", 
                    {expiresIn: "1h"}
                    )

                    res.json({token: token, expiresIn: 3600})
                }).catch(err=>{
                res.json({message: "Auth failed to generate token"})
              })
       })

//app.use("/app/posts",router)
//app.use("/api/user",userRoute);

module.exports=app