import React from "react";
import "./chat.css";
import LeftSideBar from "../../components/LeftSideBar";
import ChatBox from "../../components/ChatBox";
import RightSideBar from "../../components/RightSideBar";
const Chat = () => {
  return (
    <>
      <div className='bg-gradient-to-br from-blue-400 to-blue-800 h-screen w-full flex items-center justify-center'>
        <div className='w-full h-full p-4 bg-gray-800 rounded-lg flex scroll-smooth'>
          <LeftSideBar />
          <ChatBox />
          <RightSideBar />
        </div>
      </div>
    </>
  );
};

export default Chat;
