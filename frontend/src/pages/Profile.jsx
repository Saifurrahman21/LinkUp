import React, { useContext, useEffect } from "react";
import Nav from "../components/Nav";
import dp from "../assets/dp.webp";
import { FiPlus } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { HiPencil } from "react-icons/hi";
import { userDataContext } from "../context/userContext";
import EditProfile from "../components/EditProfile";
import { authDataContext } from "../context/AuthContext";
import Post from "../components/Post";

function Profile() {
  let { userData, setuserData, edit, setEdit, postData, setPostData } =
    useContext(userDataContext);

  let [profilePost, setProfilePost] = useState("");
  let { serverUrl } = useContext(authDataContext);

  let [userConnection, setUserConnection] = useState([]);

  const handleGetUserConnection = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/connection`, {
        withCredentials: true,
      });
      setUserConnection(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetUserConnection();
  }, []);

  useEffect(() => {
    setProfilePost(postData.filter((post) => post.author._id == userData._id));
  }, []);

  return (
    <div className="w-full min-h-[100vh] bg-[#f0efe7] flex flex-col items-center pt-[100px] pb-[40px]">
      <Nav />
      {edit && <EditProfile />}
      <div className="w-full max-h-[900px] min-h-[100vh] flex flex-col gap-[10px]">
        <div className="relative bg-[white] pb-[40px] rounded shadow-lg">
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
            <div className="text-[16px] font-semibold text-gray-500">
              {userConnection.length}
            </div>
          </div>
          <button
            className="min-w-[150px] h-[40px] my-[20px] rounded-full border-2 ml-[20px] border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center gap-[10px]"
            onClick={() => setEdit(true)}
          >
            Edit Profile <HiPencil />
          </button>
        </div>

        <div className="w-full min-h-[100px] flex items-center p-[40px] text-[22px] text-gray-600 font-semibold bg-white shadow-lg rounded-lg ">
          {`Post (${profilePost.length})`}
        </div>
        {profilePost.map((post, index) => (
          <Post
            key={index}
            id={post._id}
            description={post.description}
            author={post.author}
            image={post.image}
            like={post.like}
            comment={post.comment}
            createdAt={post.createdAt}
          />
        ))}
        {userData.skills.length > 0 && (
          <div className="w-full min-h-[100px] flex flex-col gap-[10px] justify-center items-center p-[20px] font-semibold bg-white shadow-lg rounded-lg ">
            <div className="text-[22px] text-gray-600 ">Skills</div>
            <div className="flex flex-wrap justify-start items-center gap-[20px] text-gray-700 p-[20px]">
              {userData.skills.map((skill) => (
                <div className="text-[20px]">{skill}</div>
              ))}
              <button
                className="min-w-[150px] h-[40px]  rounded-full border-2 ml-[20px] border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center gap-[10px]"
                onClick={() => setEdit(true)}
              >
                Add Skills
              </button>
            </div>
          </div>
        )}
        {userData.education.length > 0 && (
          <div className="w-full min-h-[100px] flex flex-col gap-[10px] justify-center items-center p-[20px] font-semibold bg-white shadow-lg rounded-lg ">
            <div className="text-[22px] text-gray-600 ">Education</div>
            <div className="flex flex-col justify-start items-start gap-[20px] text-gray-700 p-[20px]">
              {userData.education.map((edu) => (
                <>
                  <div className="text-[20px]">College : {edu.college}</div>
                  <div className="text-[20px]">Degree : {edu.degree}</div>
                  <div className="text-[20px]">
                    Field Of Study : {edu.fieldOfStudy}
                  </div>
                </>
              ))}
              <button
                className="min-w-[150px] h-[40px]  rounded-full border-2  border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center gap-[10px]"
                onClick={() => setEdit(true)}
              >
                Add Education
              </button>
            </div>
          </div>
        )}
        {userData.experience.length > 0 && (
          <div className="w-full min-h-[100px] flex flex-col gap-[10px] justify-center items-center p-[20px] font-semibold bg-white shadow-lg rounded-lg ">
            <div className="text-[22px] text-gray-600 ">Experience</div>
            <div className="flex flex-col justify-start items-start gap-[20px] text-gray-700 p-[20px]">
              {userData.experience.map((ex) => (
                <>
                  <div className="text-[20px]">Title : {ex.title}</div>
                  <div className="text-[20px]">Company : {ex.company}</div>
                  <div className="text-[20px]">
                    Description : {ex.description}
                  </div>
                </>
              ))}
              <button
                className="min-w-[150px] h-[40px]  rounded-full border-2  border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center gap-[10px]"
                onClick={() => setEdit(true)}
              >
                Add Experience
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
