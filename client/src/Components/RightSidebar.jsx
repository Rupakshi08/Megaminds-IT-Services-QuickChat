import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    setMsgImages(
      messages.filter(msg => msg.image).map(msg => msg.image)
    );
  }, [messages]);

  return selectedUser && (
    <div
      className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt="Profile"
          className="w-20 aspect-square rounded-full object-cover"
        />
        <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
          {onlineUsers.includes(selectedUser._id) && (
            <p className="w-2 h-2 rounded-full bg-green-500 inline-block"></p>
          )}
          {selectedUser.fullName}
        </h1>
        <p className="px-10 mx-auto text-center">{selectedUser.bio}</p>
      </div>

      <hr className="border-[#ffffff80] my-4" />

      <div className="px-5 text-xs">
        <p className="font-semibold mb-2">Media</p>
        <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
          {msgImages.map((url, index) => (
            <div
              key={index}
              onClick={() => window.open(url, '_blank')}
              className="cursor-pointer rounded overflow-hidden"
              title="Open image"
            >
              <img
                src={url}
                alt={`media-${index}`}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => logout()}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2
          bg-gradient-to-r from-purple-400 to-violet-600 text-white
          text-sm font-light py-2 px-20 rounded-full cursor-pointer border-none"
      >
        Logout
      </button>
    </div>
  );
};

export default RightSidebar;
