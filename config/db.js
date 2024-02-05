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

// const mongoose= require("mongoose")

// module.exports = ()=>{
//     const connectionParams ={
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//     };

//     try{
//         console.log("MongoDB connection string:", process.env.DB);
//                mongoose.connect(process.env.DB,connectionParams)

//                 console.log("Connected Successfully");
                
        
//             }
//             catch(err){
//                 console.log("something wrong in connection process:",err)
//             }

// }
