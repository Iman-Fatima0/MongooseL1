const express=require('express');
const app=express();
const mongoose=require('mongoose');
const{Schema}=require('mongoose');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/library').then(()=>{
    console.log('connected mongodb');
});
const BooksSchema=new Schema({
    title:{type:String,required:true,default:"required"},
    author:String,
    genre:String
})

const Book=mongoose.model('Book',BooksSchema);

app.post('/books',async(req,res)=>
{
    const data=req.body;
    // const object=new Book(data);
    // object.save();
const object=await Book.create(data);
    res.json({"messages":"Object created successfully",object});
    
})
app.get('/books/get/3:id',async(req,res)=>{
    const id=req.params.id;
    const object=await Book.findById({_id:id})//name of the id in monogdb is equal to the id declared above
    res.json({"messages":"Object created successfully",object});
});
app.listen(3000,()=>
{
    console.log('Server is running on port 3000');
})