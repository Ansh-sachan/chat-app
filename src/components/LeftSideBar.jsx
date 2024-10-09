import React, { useState } from "react";
import assets from "../assets/assets";

const LeftSideBar = () => {
  let [menu, setMenu] = useState(false);
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
            <button>Edit Profile</button>
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
        />
      </div>

      {/* friends  */}
      <div className='flex flex-col gap-4 px-4 mt-6 w-full'>
        {Array(12)
          .fill("")
          .map((elm, index) => {
            return (
              <div
                key={index}
                className=' text-gray-400 hover:text-white flex items-center gap-4 hover:bg-gradient-to-tr from-blue-500 to-blue-700'
              >
                <figure>
                  <img
                    src={assets.profile_img}
                    alt='profile'
                    className='max-w-10 rounded-full'
                  />
                </figure>
                <div>
                  <h3 className='text-white'>Name </h3>
                  <p>Hello I am using</p>
                </div>
              </div>
            );
          })}
      </div>
    </aside>
  );
};

export default LeftSideBar;
