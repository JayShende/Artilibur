export function initDraw(canvas:HTMLCanvasElement){
    const ctx=canvas.getContext("2d");

    // Set canvas width and height to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


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
    console.log(`${e.clientX} ${e.clientY}`);

   })

   canvas.addEventListener("mousemove",(e)=>{
    
    if(clicked){
        const width=e.clientX-startX;
        const height=e.clientY-startY;

        // For Width and Height use dist=(final - initial)

        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle="white"
        ctx.strokeRect(startX,startY,width,height);
        
        // console.log(`${e.clientX} ${e.clientY}`);
    }

   })
}