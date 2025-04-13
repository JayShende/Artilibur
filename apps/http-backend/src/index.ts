import express, { Request, Response } from "express";
import { middleware } from "./middleware";
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  // db call

  const parsedData = CreateUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }
  const hashedPwd = await bcrypt.hash(req.body.password, 5);

  try {
    const newUser = await prismaClient.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPwd,
      },
    });
    res.json({
      message: "Account Created Successfully",
      user: newUser,
    });
  } catch (e) {
    res.json({
      message: "Email Already Exists",
      e: e,
    });
    return;
  }
});

app.post("/signin", async (req, res) => {
  
  const parsedData=SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }
  let user: { id: string,email:string,password:string } | null;
  try {
    user = await prismaClient.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
  } 
  catch {
    res.json({
      message: "Inavlid Credentails",
    });
    return;
  }
  
  if (!user) {
    res.json({
      message: "Not Authroised",
    });
    return;
  }
  
  const result=await bcrypt.compare(req.body.password,user.password);
  
  if(!result){
    res.json({
        message:"Inavlid Password"
    });
    return;
  }

  const token =jwt.sign({
    userId:user.id
  },JWT_SECRET);

  res.json({
    message:"Signin Success",
    token:token
  })
  
  

});

app.post("/room", middleware, async(req:Request, res:Response) => {
  
  const parsedData=CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  const userId=req.userId;

  if(!userId){
    res.json({
      message:"Inavlid Request"
    });
    return;
  }

  let room: { id: number; slug: string; createdAt: Date; adminId: string; } | null=null;
  try{
      room =await prismaClient.room.create({
        data:{
          slug:parsedData.data.name,
          adminId:userId
        }
      });
  }
  catch{
      res.status(411).json({
        message: "Room already exists with this name"
    });
      // slug needs to be unique , constraint voilated and hence req failed
  }
  
  res.json({
    roomId:room?.id
  })
  
});

app.get("/chats/:roomId",async(req,res)=>{
  const roomId=Number(req.params.roomId)
  const messages=await prismaClient.chat.findMany({
    where:{
      roomId:roomId
    },
    orderBy:{
      id:"desc"
    },
    take:50
  });

  res.json(messages);
})

app.get("/room/:slug",async(req,res)=>{
  const slug=req.params.slug;
  const roomId=await prismaClient.room.findFirst({
    where:{
      slug:slug
    }
  })

  res.json(roomId?.id);
})

console.log("Running on port 3001");
app.listen(3001);
