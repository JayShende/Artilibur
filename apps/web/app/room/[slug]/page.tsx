import axios from "axios";
import { BACKEND_URL } from "../../config";
import ChatRoom from "../../../components/chat-room";

interface charRoomInterface {
  params: {
    slug: string;
  };
}

async function getRoomId(slug: string) {
  const response = await axios({
    method: "get",
    url: BACKEND_URL + "room/" + slug,
  });

  return response.data;
}

const ChatRoom2 = async ({ params }: charRoomInterface) => {
  const { slug } = await params;
  const roomId = await getRoomId(slug);
  return (
    <div>
      {slug}
      <br />
      {roomId}
      <ChatRoom roomId={roomId} />
    </div>
  );
};

export default ChatRoom2;
