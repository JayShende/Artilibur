import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import {prismaClient} from "@repo/db/client"
const PORT=8080;

const wss=new WebSocketServer({port:PORT});

interface usersInterface{
    ws:WebSocket,
    rooms:string[],
    userId:string
}

const users:usersInterface[]=[];

function verifyUser(token:string):string | null{
    let decoded:JwtPayload | undefined;
    try{
        decoded=jwt.verify(token,JWT_SECRET) as JwtPayload;
        if(!decoded.userId)
        {
            return null;
        }
    }catch{
        // the token is inavlid we will close the websocket connection
        return null;
    }

    if(!decoded.userId)
    {
        return null;
    }
    return decoded.userId;
}

wss.on("connection",(ws,request)=>{
    
    const url = request.url; // will help us get the request url say ws://localhost:3000?token=123123
    if (!url) {
      return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]); 
    // the above will split the req url into array aster the "?" as ["ws://localhost:3000","token=123123"]
    const token = queryParams.get('token') || "" ;

    const userId=verifyUser(token)
    if(userId==null){
        ws.close();
        return;
    }

    // the client is now connected and now we can add the user Details in the Global Users Array 
    console.log("Client Connected");
    users.push({
        ws:ws,
        rooms:[],
        userId:userId
    })

    //  we will have 3 types of messages "join_room", "leave_room","chat"
    
    ws.on("message",async(data)=>{
        
        // we will send an data which is string we want it in JSON, So PArse it
        //  "data" variable is not of type String so use toString() since the parse() expects, string input
        const parsedData=JSON.parse(data.toString())

        if(parsedData.type==="join_room"){
           const user=users.find(x=>x.ws===ws);
           user?.rooms.push(parsedData.roomId)
        }
        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws);
            if (!user) {
              return;
            }
          
            // Remove the room the user wants to leave
            user.rooms = user.rooms.filter(x => x !== parsedData.roomId);
            // console.log("rooms are");
            // console.log(user.rooms);
            // console.log("user");
            // console.log(user);
        }
        if(parsedData.type==="chat"){
            const roomId=parsedData.roomId;
            const message=parsedData.message;

            try{
                await prismaClient.chat.create({
                    data:{
                        roomId:Number(parsedData.roomId),
                        message:message,
                        userId:userId
                    }
                })
            }
            catch(e){
                console.log("Some Error in making DB Call");
                console.log(e);
            }

            users.forEach(user=>{
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type:"chat",
                        message:message,
                        roomId
                    }))
                }
            })
        }
        
        // console.log(users);
    })
   
});

console.log(`WebSocket Server is Running on ws://localhost:${PORT}`); 