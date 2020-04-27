if(process.env.NODE_ENV!=="production"){
    const dotenv=require("dotenv");
    dotenv.config({
        path:".env"
    });
}
const express = require("express");

const app= express();

const expressLayouts= require("express-ejs-layouts");

const indexRouter= require("./routes/index");


const mongoose= require("mongoose");

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true,
    useUnifiedTopology:true
})
const db=mongoose.connection
db.on("error", error=> console.error(error))
db.once("open", ()=> console.log("MongoDB is Connected"))

app.set("view engine", "ejs");
app.set("views", __dirname+"/views");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static('public'));

app.use('/', indexRouter);

const PORT= process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server stared port:${PORT}`);
});