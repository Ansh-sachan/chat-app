import React from "react";
import assets from "../assets/assets";

const ChatBox = () => {
  return (
    <div className='bg-white w-2/4 h-full relative'>
      <div className='flex justify-between items-center p-2'>
        <div className='flex items-center gap-4'>
          <figure>
            <img
              src={assets.profile_img}
              alt='profile'
              className='max-w-12 rounded-full'
            />
          </figure>
          <h4 className='text-2xl font-semibold'>Name</h4>
          <img src={assets.green_dot} alt='' />
        </div>
        <img src={assets.help_icon} alt='help' className='max-w-6 mr-4' />
      </div>
      <hr className='my-3 w-full mx-auto' />

      {/* chat message  */}
      <div className='chat-msg'>
        <div className='flex w-3/5 flex-row-reverse my-2'>
          <p className='bg-blue-500 text-white rounded-t-lg rounded-br-lg text-sm p-2'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat,
            enim?
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat,
            enim?
          </p>
          <div className='w-32 ml-2'>
            <img
              src={assets.profile_img}
              alt='profile'
              className='max-w-6 rounded-full mx-auto'
            />
            <p className='text-xs'>2:30 PM</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 w-full absolute bottom-2 right-0 left-0 items-center'>
        <input
          type='text'
          placeholder='send a message'
          className='w-full pl-4 outline-none bg-gray-200 rounded-full p-2'
        />
        <input type='file' id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor='image'>
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
        />
      </div>
    </div>
  );
};

export default ChatBox;
