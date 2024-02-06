const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const { reg } = require('../model/userModel');
const secretkey="Sp28"
const saltRound=10;

const stripe=require("stripe")("sk_test_51OgWF8SF5J9zEbVfIkLW9J4oQr5PruTtexJAcFWvAHXebAPEfpznU0JtgbzENSFKaBjH2ixX7H8pAMz0JqQJLybR00QvraBvQo")



const register = async (req,res)=>{
    const user=req.body;
    try{
    const samemail=await reg.findOne({email:{$eq:user.email}})// console.log(samemail.length)
    if(samemail){
        console.log({msg:"email already exists"})
        return res.send({msg:"email already exists"})
    }
    else{
        // const gen=bcrypt.genSaltSync(saltround)
        user.password=bcrypt.hashSync(user.password,saltRound)
        console.log(user.password)
        const dbres1=await reg.create(user)
        console.log(dbres1)
        const token= jwt.sign({user:user.email},secretkey,{expiresIn:'300000'})
        console.log(token)
        // arr.push(user)
        
        return res.send({msg:"user successfully registered",jwttoken:token})
    }
    
}
catch(error){
    console.log(error)
}
}




  

const login = async (req,res)=>{
    const logindetails=req.body;
    try{    
        console.log(logindetails)
        const validmaildetails= await reg.findOne({email:{$eq:logindetails.email}})
        console.log(validmaildetails)
        if(validmaildetails){
            // console.log({msg:"email already exists"}) 
    
            const comparedetails= bcrypt.compareSync(logindetails.password,validmaildetails.password)
        
            console.log(comparedetails)
            if(comparedetails)

                {
                    const token = jwt.sign({ useremail: logindetails.email }, secretkey, { expiresIn: "360000" });
                    console.log("token:", token);
                    return res.send({ msg: "your login successfully", token: token, userdetail: validmaildetails });
        
            // return res.send({msg:"your login successfully"})
                }
            else{
                return res.send({msg:"your password is wrong"})
            }
        }
    
        else{
            return res.send({msg:"first you have to register or check your credentials"})

        }
}
catch(error){
    return res.send({msg:error})
} 
}




const auth = async (req, res) => {
    const user = req.user;
    console.log(user);
    if (user && user.useremail) {
        try {
            const userinfo = await reg.findOne({ email: user.useremail });
            if (userinfo) {
                res.send({ msg: "User Authorized", userdata: userinfo })
            }
            else {
                res.status(404).send("User not found");
            }
        }
        catch (err) {
            console.log("Error fetching user detail from db:", err);
        }
    }
   console.log("user authorized")
   
}


// const payment = async (req, res) => {
//     const { products } = req.body;
//     console.log(products);
  
//     const lineItems = products.map((prod) => ({
      
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: prod.model,
//         },
//         unit_amount: prod.price * 100,
//       },
//       quantity: prod.quantity
//     }));
  
//     try {
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: lineItems,
//         mode: "payment",
//         success_url: "http://localhost:3000/",
//         cancel_url: "http://localhost:3000/cart",
//       });
  
//       res.json({ id: session.id });
//     } catch (error) {
//       console.error('Error creating checkout session:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }





//    module.exports ={register,login,auth}

module.exports ={register,login,auth}