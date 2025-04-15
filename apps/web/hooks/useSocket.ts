import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading,setLoading]=useState(true);
    const [socket,setSocket]=useState<WebSocket>();

    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OTE1ZGJlOC0wOTc2LTRmMTMtOTJmYy00ODMxZWZmODU2NTAiLCJpYXQiOjE3NDQ1MjU2NDB9.1Kjh7bhOVDXcUPBtpZIcNkTateT2kjf5hL64ZwT_Dq0`);
        
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws);
        }
    },[])

    return {socket,loading};
}