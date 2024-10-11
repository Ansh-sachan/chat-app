import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const LeftSideBar = () => {
  let navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const {
    userData,
    chatData,
    chatUser,
    setChatUser,
    messagesId,
    setMessagesId,
  } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      let input = e.target.value.toLowerCase();
      if (input) {
        setShowSearch(true);
        let userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input));
        const querySnap = await getDocs(q);
        if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
          let userExist = false;
          chatData.map((user) => {
            if (user.rID === querySnap.docs[0].data().id) {
              userExist = true;
            }
          });
          if (!userExist) {
            setUser(querySnap.docs[0].data());
          }
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
      }
    } catch (error) {}
  };

  const addChat = async () => {
    const messagesRef = collection(db, "messages");
    const chatsRef = collection(db, "chats");
    try {
      const newMessagesRef = doc(messagesRef);
      await setDoc(newMessagesRef, {
        createAt: serverTimestamp(),
        messages: [],
      });
      await updateDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion({
          messageId: newMessagesRef.id,
          lastMessage: "",
          rID: user.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });
      await updateDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion({
          messageId: newMessagesRef.id,
          lastMessage: "",
          rID: userData.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  const setChat = async (item) => {
    setMessagesId(item.messageId);
    setChatUser(item);
    try {
      const userChatRef = doc(db, "chats", userData.id);
      const userChatSnapShot = await getDoc(userChatRef);
      const userChatData = userChatSnapShot.data();
      const chatIndex = userChatData.chatsData.findIndex(
        (e) => e.messageId === item.messageId
      );
      userChatData.chatsData[chatIndex].messageSeen = true;
      await updateDoc(userChatRef, {
        chatsData: userChatData.chatsData,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <aside className='w-1/3 h-full overflow-y-scroll pb-8'>
      {/* menu  */}
      <div className='flex p-4 items-center justify-between relative'>
        <img src={assets.logo} alt='logo' className='max-w-40 object-contain' />
        <div>
          <img
            src={assets.menu_icon}
            alt='icon'
            className='max-w-5 object-contain'
            onClick={() => setMenu(!menu)}
          />
          <div
            className={`bg-white rounded-lg px-6 py-4 absolute right-2 top-14 ${
              menu ? "block" : "hidden"
            }`}
          >
            <button onClick={() => navigate("/profile")}>Edit Profile</button>
            <hr className='my-2 border-b-2 border-black' />
            <button>Logout</button>
          </div>
        </div>
      </div>

      {/* search  */}
      <div className='flex bg-blue-900 items-center p-2 rounded-lg mx-4'>
        <img
          src={assets.search_icon}
          alt=''
          className='max-w-4 object-contain mr-4'
        />
        <input
          type='text'
          className='bg-blue-900 ml-4 outline-none text-white w-full'
          placeholder='Search'
          onChange={inputHandler}
        />
      </div>

      {/* friends  */}
      <div className='flex flex-col gap-4 px-4 mt-6 w-full'>
        {showSearch && user ? (
          <div onClick={addChat}>
            <div className=' text-gray-400 px-2 py-4 rounded-lg hover:text-white flex items-center gap-4 hover:bg-gradient-to-tr from-blue-500 to-blue-700'>
              <figure className='w-20'>
                <img
                  src={user.avatar}
                  alt='profile'
                  className=' w-full object-contain rounded-full'
                />
              </figure>
              <div>
                <h3 className='text-white'>{user.name} </h3>
                <p>how are you ?</p>
              </div>
            </div>
          </div>
        ) : (
          chatData.map((item, index) => {
            return (
              <div
                onClick={() => setChat(item)}
                key={index}
                className=' text-gray-400 py-4 px-2 rounded-lg hover:text-white flex items-center gap-4 hover:bg-gradient-to-tr from-blue-500 to-blue-700'
              >
                <figure>
                  <img
                    src={item.userData.avatar}
                    alt='profile'
                    className='max-w-10 rounded-full'
                  />
                </figure>
                <div>
                  <h3 className='text-white'>{item.userData.name} </h3>
                  <p
                    className={
                      item.messageSeen || item.messageId === messagesId
                        ? ""
                        : "text-green-500"
                    }
                  >
                    {item.lastMessage}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default LeftSideBar;
