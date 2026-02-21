import React from "react";
import Nav from "../components/Nav";
import dp from "../assets/dp.webp";
import { FiPlus } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { HiPencil } from "react-icons/hi";
import { userDataContext } from "../context/userContext";

function Home() {
  let { userData, setUserData } = useContext(userDataContext);
  return (
    <div className="w-full min-h-[100vh] bg-[#f0efe7] pt-[100px] flex items-start justify-center gap-[20px] px-[20px]">
      <Nav />
      <div className="w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded-lg relative">
        <div className="w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center cursor-pointer">
          <img src="" alt="" className="w-full" />
          <FiCamera className="absolute right-[20px] top-[20px] w-[25px] h-[25px] text-gray-800 cursor-pointer" />
        </div>
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden items-center justify-center absolute top-[65px] left-[35px] cursor-pointer">
          <img src={dp} alt="" className="h-full" />
        </div>
        <div className="w-[10px] h-[10px] bg-[#17c1ff] absolute top-[105px] left-[90px] rounded-full flex justify-center items-center cursor-pointer">
          <FiPlus className="text-white" />
        </div>
        <div className="mt-[30px] pl-[20px] text-[19px] font-semibold text-gray-700">
          <div>{`${userData.firstName} ${userData.lastName}`}</div>
          <div className="text-[19px] font-semibold text-gray-700">
            {userData.headline || ""}
          </div>
          <div className="text-[16px] font-semibold text-gray-500">
            {userData.location}
          </div>
        </div>
        <button className="w-[100%] h-[40px] my-[20px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center gap-[10px]">
          Edit Profile <HiPencil />
        </button>
      </div>
      <div className="w-full lg:w-[50%] min-h-[200px] bg-white shadow-lg"></div>
      <div className="w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg"></div>
    </div>
  );
}

export default Home;
