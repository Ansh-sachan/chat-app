import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { logout } from "../config/firebase";
import { AppContext } from "../context/AppContext";

const RightSideBar = () => {
  const { chatUser, messages } = useContext(AppContext);
  const [msgImages, setMsgImages] = useState([]);
  useEffect(() => {
    let tempVar = [];
    messages.map((msg) => {
      if (msg.image) {
        tempVar.push(msg.image);
      }
    });
    console.log(tempVar);
    setMsgImages(tempVar);
  }, [messages]);
  return chatUser ? (
    <div className='relative'>
      <div className='text-center mt-10 text-white'>
        <figure>
          <img
            src={chatUser.userData.avatar}
            alt='profile'
            className='max-w-32 rounded-full mx-auto'
          />
        </figure>
        <h3 className='text-2xl my-4'>{chatUser.userData.name}</h3>
        <p className='text-gray-400 my-2'>{chatUser.userData.name}</p>
      </div>
      <hr />
      <h5 className='text-white text-xl ml-4 my-4'>Media</h5>
      <div className='grid grid-cols-3 gap-4 mx-2'>
        {msgImages.map((imageUrl, index) => {
          return (
            <img
              src={imageUrl}
              alt='loading'
              className='max-w-24'
              key={index}
              onClick={() => window.open(imageUrl)}
            />
          );
        })}
      </div>

      <button
        onClick={() => logout()}
        className='absolute bottom-0 left-0 right-0 bg-gradient-to-tr from-blue-500 to-blue-700 text-white p-4 rounded-full ml-4 hover:to-blue-900'
      >
        Logout
      </button>
    </div>
  ) : (
    <div className='relative w-1/3'>
      <button
        onClick={() => logout()}
        className='absolute bottom-0 left-0 right-0 bg-gradient-to-tr from-blue-500 to-blue-700 text-white p-4 rounded-full ml-4 hover:to-blue-900'
      >
        Logout
      </button>
    </div>
  );
};

export default RightSideBar;
