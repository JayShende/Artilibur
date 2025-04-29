import RoomCanvas from "@/components/room-canvas";



interface roomIdInterface{
    params:{
        roomId:string
    }
}

const CanvasHome = async({params}:roomIdInterface) => {
  
    
    const {roomId} = await params;
    console.log(roomId);
    return(
        <RoomCanvas
        roomId={roomId}
        />
    )
    
};



export default CanvasHome;