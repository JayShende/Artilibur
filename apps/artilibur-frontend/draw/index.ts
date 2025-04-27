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

export function initDraw(canvas:HTMLCanvasElement){
    const ctx=canvas.getContext("2d");

    // Set canvas width and height to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let existingShapes:Shape[]=[];

    let clicked=false;
    if(!ctx){
        return;
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
    existingShapes.push({
        type:"rect",
        x:startX,
        y:startY,
        width:width,
        height:height
    })

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