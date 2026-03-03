import React, { useContext, useState } from "react";
import Nav from "../components/Nav";
import dp from "../assets/dp.webp";
import { FiPlus } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { HiPencil } from "react-icons/hi";
import { userDataContext } from "../context/userContext";
import EditProfile from "../components/EditProfile";
import { RxCross1 } from "react-icons/rx";

function Home() {
  let { userData, setUserData, edit, setEdit } = useContext(userDataContext);

  return (
    <div className="w-full min-h-[100vh] bg-[#f0efe7] pt-[100px] flex items-start justify-center gap-[20px] px-[20px] relative">
      {edit && <EditProfile />}
      <Nav />
      <div className="w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded-lg relative">
        <div
          className="w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center cursor-pointer"
          onClick={() => setEdit(true)}
        >
          <img src={userData.coverImage || ""} alt="" className="w-full" />
          <FiCamera className="absolute right-[20px] top-[20px] w-[25px] h-[25px] text-white cursor-pointer" />
        </div>
        <div
          className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center absolute top-[65px] left-[35px] cursor-pointer"
          onClick={() => setEdit(true)}
        >
          <img src={userData.profileImage || dp} alt="" className="h-full" />
        </div>
        <div className="w-[10px] h-[10px] bg-[#17c1ff] absolute top-[105px] left-[90px] rounded-full flex justify-center items-center cursor-pointer">
          <FiPlus className="text-white" />
        </div>
        <div className="mt-[30px] pl-[20px]  font-semibold text-gray-700">
          <div className="text-[22px]">{`${userData.firstName} ${userData.lastName}`}</div>
          <div className="text-[18px] font-semibold text-gray-600">
            {userData.headline || ""}
          </div>
          <div className="text-[16px] font-semibold text-gray-500">
            {userData.location}
          </div>
        </div>
        <button
          className="w-[100%] h-[40px] my-[20px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center gap-[10px]"
          onClick={() => setEdit(true)}
        >
          Edit Profile <HiPencil />
        </button>
      </div>

      <div className="w-full h-full bg-black absolute top-0 z-[100] left-0 opacity-[0.6]"></div>
      <div className="w-[90%] max-w-[500px] h-[600px] bg-white shadow-lg rounded-lg absolute z-[200] p-[20px] flex items-start justify-start flex-col gap-[20px]">
        <div className="absolute top-[20px] right-[20px] cursor-pointer ">
          <RxCross1 className="w-[25px] cursor-pointer h-[25px] text-gray-800 font-bold" />
        </div>
        <div className="flex justify-center items-center gap-[10px]">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center  cursor-pointer">
            <img src={userData.profileImage || dp} alt="" className="h-full" />
          </div>
          <div>
            <div className="text-[22px]">{`${userData.firstName} ${userData.lastName}`}</div>
          </div>
        </div>
        <textarea
          className="w-full h-[200px] outline-none border-none p-[10px] resize-none text-[19px]"
          placeholder="what do you want to talk about...?"
        ></textarea>
      </div>

      <div className="w-full lg:w-[50%] min-h-[200px] bg-white shadow-lg">
        <div className="w-full h-[120px] bg-white shadow-lg rounded-lg flex items-center justify-center gap-[10px">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center  cursor-pointer">
            <img src={userData.profileImage || dp} alt="" className="h-full" />
          </div>
          <button className="w-[80%] h-[60px]  rounded-full border-2 border-gray-500 flex items-center justify-start px-[][20px] text-gray-500 hover:bg-gray-200">
            Start a Post
          </button>
        </div>
      </div>
      <div className="w-full lg:w-[25%] min-h-[200px] bg-[#f0efe7] shadow-lg"></div>
    </div>
  );
}

export default Home;
