const route = require('express').Router();
const { Router } = require('express');
const authAction = require("../controller/auth")

route.post("/register",authAction.register)
route.post("/login", authAction.login)



module.exports = route
