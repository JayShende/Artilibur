"use client";

// in this room canvas page we will be connecting to the ws server and shows a loader
// until when the socket connection is getting connected

import { WS_URL } from "@/app/config";
import { useEffect, useState } from "react";
import Canvas from "./canvas";

interface roomCanvasInterfcae {
  roomId: string;
}

const RoomCanvas = ({ roomId }: roomCanvasInterfcae) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkMjQxNTIxNS1kNTQwLTQ3ZTMtODU3Yy1kNjIzZjgwNWVjZjciLCJpYXQiOjE3NDU4NDMxMTl9.dDwDRy_cPvSiHTmKYKoQkmpmU7mT_qkZAnc7MowWT4w";

  const [socket, setSocket] = useState<WebSocket>();
  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=${token}`);

    ws.onopen = () => {
      setSocket(ws);
      // Connecting to the room using the Ws Socket

      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId: roomId,
        })
      );
    };
  }, []);

  if (!socket) {
    return <div>Connecteing to the WS Server.......</div>;
  }

  return <Canvas roomId={roomId} socket={socket} />;
};

export default RoomCanvas;
