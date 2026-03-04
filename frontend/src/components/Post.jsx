import React, { useState } from "react";
import dp from "../assets/dp.webp";
import moment from "moment";

function Post({ id, author, like, comment, description, image, createdAt }) {
  let [more, setMore] = useState(false);
  return (
    <div className="w-full min-h-[200px] flex flex-col gap-[10px] bg-white rounded-lg shadow-lg p-[20px]">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-start gap-[10px]">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center  cursor-pointer">
            <img src={author.profileImage || dp} alt="" className="h-full" />
          </div>
          <div>
            <div className="text-[22px] font-semibold">{`${author.firstName} ${author.lastName}`}</div>
            <div className="text-[16px] ">{author.headline}</div>
            <div className="text-[16px] ">{moment(createdAt).fromNow()}</div>
          </div>
        </div>
        <div>{/*button*/}</div>
      </div>
      <div
        className={`w-full ${!more ? "max-h-[100px] overflow-hidden" : ""}  pl-[50px]`}
      >
        {description}
      </div>
      <div
        className="pl-[50px] text-[19px] font-semibold cursor-pointer"
        onClick={() => setMore((prev) => !prev)}
      >
        {more ? "read less..." : "read more..."}
      </div>
      {image && (
        <div className="w-full h-[300px]  overflow-hidden flex justify-center rounded-lg">
          <img src={image} alt="" className="h-full rounded-lg" />
        </div>
      )}
    </div>
  );
}

export default Post;
