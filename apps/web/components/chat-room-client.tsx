"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

interface chatRoomClientInterface{
    messages: { message: string }[];
    id:string
}

const ChatRoomClient = ({messages,id}:chatRoomClientInterface) => {
  
    const [chats,setChats]=useState(messages);
    const{socket,loading}=useSocket();
    const[newmsg,setNewmsg]=useState("");
    useEffect(()=>{
        // connect to the room and then send / recive messages
        
        if(socket && !loading){
            socket.send(JSON.stringify({
                "type":"join_room",
                "roomId":id
            }))

            socket.onmessage=(event)=>{
                // check if the message recived is an type="chat" only or something else
                // whenever we recive a new message we have to apppend it to the older messages
                
                const parsedData=JSON.parse(event.data);
                if(parsedData.type==="chat"){
                    setChats((chat)=>[...chat,{message:parsedData.message}])
                }
            }
        }
        
    },[socket,loading,id])

    return (
    <div>
      {loading?"Loading....": ""}
      {/* {JSON.stringify(chats)} */}
     
     {chats.map((m,index)=>
        <div key={index} >{m.message}</div>
      )}
      <input type="text" 
      value={newmsg}
      onChange={(e)=>{
        setNewmsg(e.target.value)
      }}
      />

      <button
      onClick={()=>{
        socket?.send(JSON.stringify({
            type:"chat",
            message:newmsg,
            roomId:id
        }))
        setNewmsg("");
      }}
      >Send Msg</button>
    </div>
  )
};

export default ChatRoomClient;
