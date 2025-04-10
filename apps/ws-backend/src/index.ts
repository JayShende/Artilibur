import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const PORT=8080;

const wss=new WebSocketServer({port:PORT});

wss.on("connection",(ws,request)=>{
    
    const url = request.url; // will help us get the request url say ws://localhost:3000?token=123123
    if (!url) {
      return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]); 
    // the above will split the req url into array aster the "?" as ["ws://localhost:3000","token=123123"]
    const token = queryParams.get('token') || "" ;

    let decoded:JwtPayload | undefined;

    try{
        decoded=jwt.verify(token,JWT_SECRET) as JwtPayload;
        if(!decoded.userId)
        {
            ws.close();
            return;
        }
    }catch{
        // the token is inavlid we will close the websocket connection
        ws.close();
        return;
    }

    console.log("Client Connected");

    ws.on("message",(message)=>{
        console.log(`Message Recived is ${message}`);
        ws.send(`Sent From the Server ${message}`);
    })
});

console.log(`WebSocket Server is Running on ws://localhost:${PORT}`); 