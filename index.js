// require('dotenv').config()
const express=require('express');

const app = express();

const {routes} = require('./Route');


const cors = require('cors');
const { Connection } = require('./config/db');
const { adddata } = require('./Controller/serverController');
// const connection = require('./config/db')

app.use(cors({
    origin:"*"
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))




app.use('/api',routes)
app.use('/api',adddata)

// app.use('/api/user',userRoute)
// app.use('/api/auth',authRoute)


// const port =process.env.PORT ||5050;

// connection();

app.listen(5050,async()=>{
     
   try{
    await Connection();
   }
   catch(err){
    console.log(err,"error")
   }
})

// app.listen(port,()=>{
//     try{
            
//             console.log(`listing on port ${port}...........`)
//            }
//            catch(err){
//             console.log(err,"error")
//            }
// })