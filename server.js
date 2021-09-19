const express = require('express');
const connectDB = require("./database")

require('dotenv').config()

const app = express();
connectDB()
app.get("/",(req,res)=>{
    res.send("running")
})

const port = process.env.PORT || 5000 ;

app.listen(port , ()=>console.log(`server running at ${port}`))