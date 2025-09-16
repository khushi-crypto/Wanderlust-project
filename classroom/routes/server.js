const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(session({secret:"mysupersecreting",
    resave:false,
    saveUninitialized:true,
}));

app.use(session(sessionOptions));
app.use(flash());

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    req.flash("success","user registered successfully");
    res.redirect("/reqcount");
})

app.get("/reqcount",(req,res)=>{
    res.send(`you sent`);
});

// app.get("/test",(req,res)=>{
//     res.send("test successful!");
// });

app.listen(3000,()=>{
    console.log("server is listening");
});