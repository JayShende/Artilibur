import { BACKEND_URL } from "@/app/config";
import axios from "axios";

type Shape={
    type:"rect",
    x:number,
    y:number,
    width:number,
    height:number
}|{
    type:"circle",
    centerX:number,
    centerY:number,
    radius:number
};


export async function initDraw(canvas:HTMLCanvasElement,roomId:string,socket:WebSocket){
    const ctx=canvas.getContext("2d");

    // Set canvas width and height to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // const a= await getExistingShapes(roomId);
    // console.log(a);
    let existingShapes:Shape[]=await getExistingShapes(roomId);

    let clicked=false;
    if(!ctx){
        return;
    }
    // Calling the clearCanvas() so that the Shapes in the DB Get on The Screen
    clearCanvas(canvas,existingShapes,ctx);

    socket.onmessage=(event)=>{
        const message=JSON.parse(event.data)
        console.log("Message ala");
        console.log(message);
        if(message.type=="chat"){
        const shape=JSON.parse(message.message);
            existingShapes.push(shape);
            clearCanvas(canvas,existingShapes,ctx);
        }
    }

    let startX=0;
    let startY=0;

   canvas.addEventListener("mousedown",(e)=>{
    clicked=true
    startX=e.clientX;
    startY=e.clientY;
    // console.log(`${e.clientX} ${e.clientY}`);
   })

   canvas.addEventListener("mouseup",(e)=>{
    clicked=false
    // on mouseUp add to the existingShapes
    const width=e.clientX-startX;
    const height=e.clientY-startY;

    const shape:Shape={
        type:"rect",
        x:startX,
        y:startY,
        width:width,
        height:height
    };
    existingShapes.push(shape)

    //  also on mouseUp Event Broadcast the shape

    socket.send(JSON.stringify({
        type:"chat",
        roomId:roomId,
        message:JSON.stringify(shape)
    }))

    console.log(existingShapes);
   })

   canvas.addEventListener("mousemove",(e)=>{
    
    if(clicked){
        const width=e.clientX-startX;
        const height=e.clientY-startY;

        // For Width and Height use dist=(final - initial)
        
        clearCanvas(canvas,existingShapes,ctx);

        ctx.strokeStyle="white"
        ctx.strokeRect(startX,startY,width,height);
        
        // console.log(`${e.clientX} ${e.clientY}`);
    }

   })
}

function clearCanvas(canvas:HTMLCanvasElement,existingShapes:Shape[],ctx:CanvasRenderingContext2D){
    ctx.clearRect(0,0,canvas.width,canvas.height);
        existingShapes.map((shape)=>{
            if(shape.type=="rect"){
                ctx.strokeStyle="white"
                ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
            }
        })
}

async function getExistingShapes(roomId:string){
    const response=await axios({
        method:"get",
        url:`${BACKEND_URL}chats/${roomId}`
    });

    const messages=response.data;
    console.log(messages);
    const shapes=messages.map((x:{message:string})=>{
        const msgData=JSON.parse(x.message);
        return msgData;
    })
    return shapes;
}