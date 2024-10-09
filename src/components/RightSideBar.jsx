import React from "react";
import assets from "../assets/assets";
import { logout } from "../config/firebase";

const RightSideBar = () => {
  return (
    <div className='relative'>
      <div className='text-center mt-10 text-white'>
        <figure>
          <img
            src={assets.profile_img}
            alt='profile'
            className='max-w-32 rounded-full mx-auto'
          />
        </figure>
        <h3 className='text-2xl my-4'>Name</h3>
        <p className='text-gray-400 my-2'>Hello i am name ,I am busy</p>
      </div>
      <hr />
      <h5>Media</h5>
      <div className='grid grid-cols-3 gap-4 mx-2'>
        <img src={assets.pic1} alt='loading' className='max-w-24' />
        <img src={assets.pic1} alt='loading' className='max-w-24' />
        <img src={assets.pic1} alt='loading' className='max-w-24' />
        <img src={assets.pic1} alt='loading' className='max-w-24' />
        <img src={assets.pic1} alt='loading' className='max-w-24' />
        <img src={assets.pic1} alt='loading' className='max-w-24' />
      </div>

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
