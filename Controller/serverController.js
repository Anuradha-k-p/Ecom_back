const { data } = require('../Data')
const { addcartdata } = require('../model/userProduct')


const adddata=async (req,res)=>{
    try{
           const data=await data.create(global)
       res.send(data)
    }
    catch(err){
       console.log("data not getting",err)
    }
   
   }
   
   const addcart1=async(req,res)=>{
      const data=req.body;
      console.log(data)
     const data2=await addcartdata.create(data);
     res.send(data2)
   }


   module.exports={adddata,addcart1}