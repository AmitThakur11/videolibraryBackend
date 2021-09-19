const express = require('express');


require('dotenv').config()

const app = express();

app.get("/",(req,res)=>{
    res.send("running")
})

const port = process.env.PORT || 5000 ;

app.listen(port , ()=>console.log(`server running at ${port}`))