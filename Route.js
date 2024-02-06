const routes =require('express').Router();

const {data} = require('./Data');

routes.get('/ecom',data);



//const express=require('express')
// const route= express.Router()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const { register, login} = require('./Controller/userController');
const secretkey="Sp28"
const saltRound=10;
//const auth=require('./Middleware')
let arr=[]

routes.post('/register',register)

routes.post('/login',login)

// routes.post('/payment',payment)










module.exports={routes}