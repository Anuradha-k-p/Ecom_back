const mongoose=require("mongoose")
mongoose.set("strictQuery",true);
const mongocloudUrl="mongodb+srv://Sp-28:Sp28@cluster0.appq5nf.mongodb.net/?retryWrites=true&w=majority"
const Connection=async ()=>{
    try{
        await mongoose.connect(mongocloudUrl);
        console.log("Connected Successfully");
        

    }
    catch(err){
        console.log("something wrong in connection process:",err)
    }
}
module.exports={Connection}