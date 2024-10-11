import React, { useState } from "react";
import "./login.css";
import assets from "../../assets/assets";
import { signup, login, resetPass } from "../../config/firebase";
const Login = () => {
  let [currentState, setCurrentState] = useState("signup");
  let [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentState === "signup") {
      signup(userData.username, userData.email, userData.password);
    } else {
      login(userData.email, userData.password);
    }
  };
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
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        ) : (
          ""
        )}

        <input
          type='text'
          className='p-2 outline-2 border-2 border-blue-400 rounded-lg'
          placeholder='Email address'
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type='password'
          className='p-2 outline-2 border-2 border-blue-400 rounded-lg'
          placeholder='password'
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <button
          className='bg-blue-500 py-2 capitalize text-white text-xl hover:bg-blue-600 rounded-lg'
          onClick={handleSubmit}
        >
          {currentState === "signup" ? "create account" : "Login Now"}
        </button>
        <div className='flex'>
          <input type='checkbox' required />
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
        {currentState === "login" ? (
          <div>
            <p>
              Forgot Password ?
              <span
                className='text-blue-600 cursor-pointer ml-2'
                onClick={() => resetPass(userData.email)}
              >
                Reset password
              </span>
            </p>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Login;
