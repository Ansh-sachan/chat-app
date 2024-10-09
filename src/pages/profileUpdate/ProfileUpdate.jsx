import React, { useState } from "react";
import "./profileUpdate.css";
import assets from "../../assets/assets";
const ProfileUpdate = () => {
  let [image, setImage] = useState(false);
  return (
    <div className='bg-gradient-to-tr from-blue-500 to-blue-900 h-screen w-full flex items-center justify-center'>
      <div className='flex bg-white rounded-lg shadow-2xl p-4 w-2/3'>
        <form className='flex flex-col basis-1/2'>
          <h2 className='text-3xl my-4'>Profile Details</h2>
          <label htmlFor='avatar' className='my-4'>
            <input
              type='file'
              onChange={(e) => setImage(e.target.files[0])}
              id='avatar'
              accept='.jpg, .png, .jpeg'
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt='image'
              className='inline-block mr-4 w-1/2 rounded-full'
            />
            <span className='text-xl text-gray-500'>Update profile pic</span>
          </label>
          <input
            type='text'
            placeholder='profile name'
            className='p-2 my-2 border-4 rounded-lg border-blue-500'
          />
          <textarea
            rows={3}
            placeholder='Bio'
            className='p-2 my-2 border-4 rounded-lg border-blue-500'
          ></textarea>
          <button className='bg-blue-500 p-3 text-white text-2xl rounded-lg mt-2'>
            Save
          </button>
        </form>
        <figure className='basis-1/2 flex justify-center items-center'>
          <img
            src={image ? URL.createObjectURL(image) : assets.logo_icon}
            alt='logo'
            className='w-60 rounded-full object-contain'
          />
        </figure>
      </div>
    </div>
  );
};

export default ProfileUpdate;
