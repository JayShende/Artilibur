"use client";

import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";


const Canvas = () => {
  
    const canvasRef=useRef<HTMLCanvasElement>(null);

    useEffect(()=>{

        if(!canvasRef.current){
            return;
        }
        initDraw(canvasRef.current)

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