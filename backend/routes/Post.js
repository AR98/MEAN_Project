const express=require('express');
const bodyparser=require('body-parser')
const Post=require('../Models/post')
const connection=require('../connection');
const multer=require('multer');

const router=express.Router();
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
}        cb(null,'/backend/images')
    },
    filename: (req,file,cb)=>{
        const  name= file.originalname.toLocaleLowerCase().split(' ').join('-');
        const ext= MIME_TYPE_MAP(file.mimetype)
        cb(null, name+'-'+Date.now()+'.'+ext)
    }
})

router.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    next();
})

router.post('',multer({storage: storage}).single("image"),(req,res,next)=>{
console.log('post method called !')
    const post=new Post({
        title: req.body.title,
        content: req.body.content
    }
    )
// Storing post in Db
    post.save().then(res=>console.log('successfully saved data in db')).catch(err=>console.log(err))
    console.log(post);
    res.json({message:"data posted successfully!"})

})

router.get('',(req,res,next)=>{
    console.log('second middleware initialised');
     
    Post.find().then(data=>{

        console.log(data);

        res.json({message:"posts fetched successful", post:data});
       }).catch(err=>console.log("somthing wrong went with fetching query"))
   
    })

    router.delete('/:id',(req,res,next)=>{

        Post.deleteOne({_id: req.params.id}).then(data=>console.log('Successfully deleted post')).catch(err=>console.log('somthing went wrong with delete query'))

        res.json({message: "successfully deleted"})
    })

    router.put('/:id',(req,res,next)=>{
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

    module.exports=router
    //this file is not working because we don't import it in app