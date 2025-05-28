import React, { MutableRefObject } from "react";
import Image from "next/image";

interface ProfileModalProps {
  profilePic: string;
  user: { email?: string | null } | null;
  profileRef: MutableRefObject<HTMLDivElement | null>;
  handleLogout: () => void;
  setIsProfileModalOpen: (value: boolean) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  profilePic,
  user,
  profileRef,
  handleLogout,
  setIsProfileModalOpen,
}) => {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-50" />
      {/* Modal */}
      <div
        ref={profileRef}
        className="fixed top-4 right-4 w-80 bg-[#170A2D] text-white rounded-xl shadow-lg z-[60] animate-slideInRight"
      >
        <div className="flex flex-col items-center p-6">
          <Image
            src={profilePic}
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full border-2 border-[#FF604F] object-cover mb-2"
          />
          <span className="font-semibold text-white">
            {user?.email?.split("@")[0].toUpperCase()}
          </span>
          <span className="text-xs text-gray-500 mb-4">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded bg-[#FF604F] text-white font-semibold hover:bg-[#d44a3b] transition"
          >
            Log Out
          </button>
        </div>
        {/* Close Icon */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-[#FF604F] text-2xl"
          onClick={() => setIsProfileModalOpen(false)}
        >
          &times;
        </button>
      </div>
      {/* Slide-in animation */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
};

export default ProfileModal;
