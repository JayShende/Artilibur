import express from "express";
import { middleware } from "./middleware";
import {CreateUserSchema} from "@repo/common/types"
import {prismaClient} from "@repo/db/client"
import bcrypt from "bcryptjs";

const app=express();
app.use(express.json());



app.post("/signup",async(req,res)=>{
    // db call

    const response=CreateUserSchema.safeParse(req.body);
    if(!response.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }
    const{name,email,password}=req.body;
    const hashedPwd=await bcrypt.hash(password,5);
   let newUser:object
    try{
        newUser=await prismaClient.user.create({
            data:{
                name:name,
                email:email,
                password:hashedPwd,
            }
        })
    
    }catch{
        res.json({
            message:"Email Already Exists"
        })
    }

    res.json({
        message:"Account Created Successfully",
        user:newUser
    })
})

app.post("/signin",(req,res)=>{

})

app.post("/ room",middleware,(req,res)=>{
    res.json({
        roomId:"123"
    })
})

app.listen(3001);