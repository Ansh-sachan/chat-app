import React, { useContext, useEffect, useState } from "react";
import "./profileUpdate.css";
import assets from "../../assets/assets";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../lib/upload";
import { AppContext } from "../../context/AppContext";

const ProfileUpdate = () => {
  let navigate = useNavigate();
  let { setUserData } = useContext(AppContext);
  let [image, setImage] = useState(false);
  let [name, setName] = useState("");
  let [bio, setBio] = useState("");
  let [uid, setUid] = useState("");
  let [prevImage, setPrevImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!image && !prevImage) {
        toast.error("update profile picture");
      }
      const docRef = doc(db, "users", uid);
      if (image) {
        const imageUrl = await upload(image);
        setPrevImage(imageUrl);
        await updateDoc(docRef, {
          avatar: imageUrl,
          bio,
          name,
        });
      } else {
        await updateDoc(docRef, {
          bio,
          name,
        });
      }
      const snap = await getDoc(docRef);
      setUserData(snap.data());
      navigate("/chat");
    } catch (error) {
      console.error(error);
      toast.error(error.code);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().name) {
          setName(docSnap.data().name);
        }
        if (docSnap.data().bio) {
          setBio(docSnap.data().bio);
        }
        if (docSnap.data().avatar) {
          setPrevImage(docSnap.data().avatar);
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className='bg-gradient-to-tr from-blue-500 to-blue-900 h-screen w-full flex items-center justify-center'>
      <div className='flex bg-white rounded-lg shadow-2xl p-4 w-2/3'>
        <form className='flex flex-col basis-1/2' onSubmit={handleSubmit}>
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
              src={
                image
                  ? URL.createObjectURL(image)
                  : prevImage
                  ? prevImage
                  : assets.avatar_icon
              }
              alt='image'
              className='inline-block mr-4 w-1/4 rounded-full cursor-pointer'
            />
            <span className='text-xl text-gray-500'>Update profile pic</span>
          </label>
          <input
            type='text'
            placeholder='profile name'
            className='p-2 my-2 border-4 rounded-lg border-blue-500'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            rows={3}
            placeholder='Bio'
            className='p-2 my-2 border-4 rounded-lg border-blue-500'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <input
            type='submit'
            className='bg-blue-500 p-3 text-white text-2xl rounded-lg mt-2 cursor-pointer'
            value={"save"}
          />
          {/* <button className='bg-blue-500 p-3 text-white text-2xl rounded-lg mt-2'>
            Save
          </button> */}
        </form>
        <figure className='basis-1/2 flex justify-center items-center'>
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : prevImage
                ? prevImage
                : assets.logo_icon
            }
            alt='logo'
            className='w-60 rounded-full object-contain'
          />
        </figure>
      </div>
    </div>
  );
};

export default ProfileUpdate;
