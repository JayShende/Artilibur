"use client";

import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";

interface CanvasInterface{
    roomId:string
    socket:WebSocket
}

const Canvas = ({
    roomId,
    socket
}:CanvasInterface) => {

    const canvasRef=useRef<HTMLCanvasElement>(null);
    useEffect(()=>{

        if(!canvasRef.current){
            return;
        }
        initDraw(canvasRef.current,roomId,socket)

    },[canvasRef])
    return (
    <div>
      <canvas 
      ref={canvasRef}
      >

      </canvas>
    </div>
  )
};

export default Canvas;
