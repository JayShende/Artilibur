import axios from "axios";
import { BACKEND_URL } from "../app/config";
import ChatRoomClient from "./chat-room-client";

interface chatRoomInterface{
    roomId:string
}

async function getChats(roomId:string){
    const ur=`${BACKEND_URL}chats/${roomId}`
    console.log(ur);
    const response=await axios({
        method:"get",
        url:ur
    });
    console.log(response.data);
    return response.data;
}

const ChatRoom = async({roomId}:chatRoomInterface) => {
    
    const messages=await getChats(roomId)
    return (
    // <div>
    //   {/* {messages.map((msg:{message:string},index:number)=>{
    //     <div key={index}>{msg.message}</div>
    //   })} */}

    //   {messages.map(m=>
    //     <div  >{m.id}</div>
    //   )}
    // </div>
    <ChatRoomClient
    id={roomId}
    messages={messages}
    />
  )
};

export default ChatRoom;
// this code is getting the old messages from the db