import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const userDataContext = createContext();

export const socket = io("https://linkup-backend-asu7.onrender.com", {
  withCredentials: true,
});

function UserContext({ children }) {
  let [userData, setUserData] = useState(null);
  let { serverUrl } = useContext(authDataContext);
  let [edit, setEdit] = useState(false);
  let [postData, setPostData] = useState([]);
  let [profileData, setProfileData] = useState(null);
  let [suggestedUsers, setSuggestedUsers] = useState([]);
  let navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/user/currentuser`, {
        withCredentials: true,
      });
      setUserData(result.data);
      return result.data;
    } catch (error) {
      console.log("Current user error:", error);
      setUserData(null);
      return null;
    }
  };

  const getPost = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/post/getpost`, {
        withCredentials: true,
      });
      console.log("Posts:", result.data);
      setPostData(result.data);
    } catch (error) {
      console.log("Post fetch error:", error);
      setPostData([]);
    }
  };

  const getSuggestedUsers = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/user/suggested`, {
        withCredentials: true,
      });
      console.log("Suggested Users:", result.data);
      setSuggestedUsers(result.data);
    } catch (error) {
      console.log("Suggested users error:", error);
      setSuggestedUsers([]);
    }
  };

  const handleGetProfile = async (userName) => {
    try {
      let result = await axios.get(`${serverUrl}/api/user/profile/${userName}`, {
        withCredentials: true,
      });
      setProfileData(result.data);
      navigate("/profile");
    } catch (error) {
      console.log("Profile fetch error:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const user = await getCurrentUser();

      if (user) {
        await getPost();
        await getSuggestedUsers();
      }
    };

    init();
  }, [serverUrl]);

  const value = {
    userData,
    setUserData,
    edit,
    setEdit,
    postData,
    setPostData,
    getPost,
    handleGetProfile,
    profileData,
    setProfileData,
    suggestedUsers,
    setSuggestedUsers,
    getSuggestedUsers,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
