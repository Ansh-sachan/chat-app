import React, { useState } from "react";
import "./login.css";
import assets from "../../assets/assets";
const Login = () => {
  let [currentState, setCurrentState] = useState("signup");

  return (
    <div className='login'>
      <img src={assets.logo_big} alt='' className='max-w-[20vw]' />
      <form className='flex flex-col gap-4 bg-white rounded-lg px-6 py-10'>
        <h2 className='text-blue-500 text-2xl text-center font-bold my-4 capitalize'>
          {currentState}
        </h2>
        {currentState === "signup" ? (
          <input
            type='text'
            className='p-2 outline-2 border-2 border-blue-400 rounded-lg'
            placeholder='Username'
          />
        ) : (
          ""
        )}

        <input
          type='text'
          className='p-2 outline-2 border-2 border-blue-400 rounded-lg'
          placeholder='Email address'
        />
        <input
          type='password'
          className='p-2 outline-2 border-2 border-blue-400 rounded-lg'
          placeholder='password'
        />
        <button className='bg-blue-500 py-2 capitalize text-white text-xl hover:bg-blue-600 rounded-lg'>
          {currentState === "signup" ? "create account" : "Login Now"}
        </button>
        <div className='flex'>
          <input type='checkbox' />
          <p className='ml-2'>
            Agree to the terms and conditions of use & privacy policy
          </p>
        </div>
        <div>
          <p>
            {currentState === "signup"
              ? "Already have a account?"
              : "To create a new account"}
            <span
              className='text-blue-600 cursor-pointer ml-2'
              onClick={() =>
                setCurrentState((prev) =>
                  prev === "signup" ? "login" : "signup"
                )
              }
            >
              click here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
