const express = require('express');
const connectDB = require("./database");
const cors = require('cors');
const authRoute = require("./route/auth");
const videoRoute = require("./route/video");
const userVideoRoute = require("./route/userVideo")



require('dotenv').config();

const app = express();
app.use(cors())
app.use(express.json())
connectDB()
app.get("/",(req,res)=>{
    res.send("running")
})
app.use("/video",videoRoute)
app.use("/auth",authRoute);
app.use("/user",userVideoRoute)






const port = process.env.PORT || 3000 ;

app.listen(port , ()=>console.log(`server running at ${port}`))