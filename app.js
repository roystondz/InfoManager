const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")


app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/read",async (req,res)=>{
    let allusers =await userModel.find();
    res.render("read",{user:allusers})
})

app.post("/create",async (req,res)=>{
    let createdUser = await userModel.create({
        name:req.body.name,
        email:req.body.email,
        image:req.body.url
    })
    console.log(createdUser);
    res.redirect("/")
})

app.get("/delete/:id",async (req,res)=>{
    let allusers =await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/read")
})

app.get("/edit/:id",async (req,res)=>{
    let user =await userModel.findOne({_id:req.params.id});
    res.render("edit",{user:user})
})


app.post("/update/:id",async function(req,res,next){
    let {image ,name,email} = req.body; 
    let user =await userModel.findOneAndUpdate({_id:req.params.id},{image,email,name},{new:true});
    res.redirect("/read")
})


app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000");
})