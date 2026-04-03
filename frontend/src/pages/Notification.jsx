import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import dp from "../assets/dp.webp";
import { userDataContext } from "../context/UserContext";
function Notification() {
  let { serverUrl } = useContext(authDataContext);
  let [notificationData, setNotificationData] = useState([]);
  let { userData } = useContext(userDataContext);
  const handleGetNotification = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/notification/get", {
        withCredentials: true,
      });
      setNotificationData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handledeleteNotification = async (id) => {
    try {
      let result = await axios.delete(
        serverUrl + `/api/notification/deleteone/${id}`,
        { withCredentials: true },
      );
      await handleGetNotification();
    } catch (error) {
      console.log(error);
    }
  };
  const handleClearAllNotification = async () => {
    try {
      let result = await axios.delete(serverUrl + "/api/notification", {
        withCredentials: true,
      });
      await handleGetNotification();
    } catch (error) {
      console.log(error);
    }
  };
  const handleMessage = (type) => {
    if (type == "like") {
      return "liked your post";
    } else if (type == "comment") {
      return "commented on your post";
    } else {
      return "Accept your connection";
    }
  };

  useEffect(() => {
    handleGetNotification();
  }, []);
  return (
    <div className="w-screen min-h-screen bg-[#f0efe7] pt-[100px] px-[20px] flex flex-col items-center gap-[30px]">
      <Nav />

      {/* HEADER */}
      <div className="w-full max-w-[900px] h-[80px] bg-white shadow-md rounded-xl flex items-center px-6 text-lg text-gray-700 justify-between">
        <div className="font-semibold">
          Notifications ({notificationData.length})
        </div>

        {notificationData.length > 0 && (
          <button
            className="px-4 py-2 rounded-full border border-red-400 text-red-500 hover:bg-red-50 transition"
            onClick={handleClearAllNotification}
          >
            Clear All
          </button>
        )}
      </div>

      {/* NOTIFICATION LIST */}
      {notificationData.length > 0 ? (
        <div className="w-full max-w-[900px] bg-white shadow-md rounded-xl overflow-hidden">
          {notificationData.map((noti) => (
            <div
              key={noti._id} 
              className="flex justify-between items-start gap-4 p-4 border-b last:border-none hover:bg-gray-50 transition"
            >
              {/* LEFT SECTION */}
              <div className="flex gap-4">
                {/* PROFILE IMAGE */}
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={noti.relatedUser.profileImage || dp}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TEXT + POST */}
                <div className="flex flex-col gap-2">
                  <div className="text-gray-800 text-sm leading-snug">
                    <span className="font-semibold">
                      {noti.relatedUser.firstName} {noti.relatedUser.lastName}
                    </span>{" "}
                    {handleMessage(noti.type)}
                  </div>

                  {/* POST PREVIEW */}
                  {noti.relatedPost && (
                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2 w-fit">
                      <img
                        src={noti.relatedPost.image}
                        alt=""
                        className="w-16 h-12 object-cover rounded-md"
                      />
                      <p className="text-xs text-gray-600 max-w-[200px] truncate">
                        {noti.relatedPost.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() => handledeleteNotification(noti._id)}
                className="p-2 rounded-full hover:bg-red-100 transition"
              >
                <RxCross1 className="w-4 h-4 text-gray-500 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 mt-10">No notifications</div>
      )}
    </div>
  );
}

export default Notification;
