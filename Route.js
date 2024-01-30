const routes =require('express').Router();

const {data} = require('./Data');

routes.get('/ecom',data);

//const express=require('express')
// const route= express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const secretkey="Sp28"
const saltRound=10;
//const auth=require('./Middleware')
let arr=[]

routes.post('/register',(req,res)=>{
    logindata=req.body
    console.log(logindata)
    logindata.password=bcrypt.hashSync(logindata.password,saltRound)
    const acc=arr.find((item)=>item.email===logindata.email)
    if(acc){
        return res.send({msg:"email Already exist"});
    }


arr.push(logindata)
//console.log(arr)
const token=jwt.sign({user:logindata.email},secretkey)
res.send({msg:"user Registered Successfully",token:token})
})

routes.post('/login',(req,res)=>{
 logindata=req.body
const acc=arr.find((item)=>item.email===logindata.email)
if(acc){
    const login=bcrypt.compareSync(logindata.password,acc.password)

if(login){
    const token=jwt.sign({user:logindata.email},secretkey,{expiresIn:'365d'})
    console.log(login,"Login");
    return res.send({msg:"Kudos!!!!☺️☺️☺️..Login successful!!"})
}
else{
    return res.send({msg:"Password Incorrect"})
}
}
else{
    return res.send({msg:"Oppss...😿😿try again"})
}
})






module.exports={routes}