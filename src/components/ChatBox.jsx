import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { AppContext } from "../context/AppContext";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const ChatBox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } =
    useContext(AppContext);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sID: userData.id,
            text: input,
            createdAt: new Date(),
          }),
        });
        let userIDs = [chatUser.rID, userData.id];
        userIDs.forEach(async (id) => {
          const userChatRef = doc(db, "chats", id);
          const userChatSnapShot = await getDoc(userChatRef);
          if (userChatSnapShot.exists()) {
            const userChatData = userChatSnapShot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId
            );
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rID === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
    setInput("");
  };

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        setMessages(res.data().messages.reverse());
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  return (
    <>
      {chatUser && userData ? (
        <div className='bg-gray-900 text-white w-2/4 h-full relative'>
          <div className='flex justify-between items-center p-2'>
            <div className='flex items-center gap-4'>
              <figure>
                <img
                  src={chatUser.userData.avatar}
                  alt='profile'
                  className='max-w-12 rounded-full'
                />
              </figure>
              <h4 className='text-2xl font-semibold'>
                {chatUser.userData.name}
              </h4>
              <img src={assets.green_dot} alt='' />
            </div>
            <img src={assets.help_icon} alt='help' className='max-w-6 mr-4' />
          </div>
          <hr className='my-3 w-full mx-auto' />

          {/* chat message  */}
          <div className='chat-msg'>
            {messages.map((msg, index) => {
              return (
                <div
                  className={
                    msg.sID === userData.id
                      ? "flex w-3/5 flex-row-reverse my-2"
                      : "flex justify-start w-full my-2"
                  }
                >
                  <p className='bg-blue-500 text-white rounded-t-lg rounded-br-lg text-sm p-2'></p>
                  <div className='w-32'>
                    <img
                      src={assets.profile_img}
                      alt='profile'
                      className='max-w-6 rounded-full mx-auto'
                    />
                    <p className='text-xs'>2:30 PM</p>
                  </div>
                </div>
              );
            })}
            {/* <div className='flex w-3/5 flex-row-reverse my-2'>
              <p className='bg-blue-500 text-white rounded-t-lg rounded-br-lg text-sm p-2'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Fugiat, enim?
              </p>
              <div className='w-32'>
                <img
                  src={assets.profile_img}
                  alt='profile'
                  className='max-w-6 rounded-full mx-auto'
                />
                <p className='text-xs'>2:30 PM</p>
              </div>
            </div>
            <div className='flex justify-start w-full my-2'>
              <div className='w-3/5'></div>
              <p className=' bg-blue-500 text-white rounded-t-lg rounded-bl-lg text-sm p-2 w-3/5'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Fugiat, enim?
              </p>
              <div className='w-32 ml-2'>
                <img
                  src={assets.profile_img}
                  alt='profile'
                  className='max-w-6 rounded-full mx-auto'
                />
                <p className='text-xs'>2:30 PM</p>
              </div>
            </div> */}
          </div>

          <div className='flex gap-2 w-full absolute bottom-2 right-0 left-0 items-center'>
            <input
              type='text'
              placeholder='send a message'
              className='w-full pl-4 outline-none bg-gray-200 rounded-full p-2 text-black'
              value={input}
              onChange={({ target }) => setInput(target.value)}
            />
            <input
              type='file'
              id='image'
              accept='image/png, image/jpeg'
              hidden
            />
            <label htmlFor='image' className='bg-white p-2 rounded-lg'>
              <img
                src={assets.gallery_icon}
                alt='gallery'
                className='cursor-pointer max-w-6'
              />
            </label>
            <img
              src={assets.send_button}
              alt='send'
              className='cursor-pointer max-w-8 mr-2'
              onClick={sendMessage}
            />
          </div>
        </div>
      ) : (
        <div className='flex flex-col text-white text-3xl w-1/2 justify-center items-center my-2'>
          <img
            src={assets.logo_icon}
            alt='logo'
            className='w-1/3 object-contain mb-20'
          />
          <h2>Welcome</h2>
        </div>
      )}
    </>
  );
};

export default ChatBox;
