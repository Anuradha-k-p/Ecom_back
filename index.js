const express=require('express');

const app = express();

const {routes} = require('./Route');

const cors = require('cors');
const { Connection } = require('./config/db');

app.use(cors({
    origin:"*"
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))




app.use('/api',routes)

app.listen(5050,async()=>{
     
   try{
    await Connection();
   }
   catch(err){
    console.log(err,"error")
   }
})