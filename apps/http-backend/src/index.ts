import express from "express";
import { middleware } from "./middleware";
import {CreateUserSchema} from "@repo/common/types"
const app=express();
app.use(express.json());



app.post("/signup",(req,res)=>{
    // db call

    const response=CreateUserSchema.safeParse(req.body);
    if(!response.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }
    res.json({
        message:"Account Created Successfully"
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