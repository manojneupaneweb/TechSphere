// ProfileInfo.jsx
import React from 'react';
import { User } from 'lucide-react';

const ProfileInfo = ({ user }) => (
  <div className="space-y-6">
    <div className="flex items-center">
      <div className="h-24 w-24 rounded-full overflow-hidden mr-6 bg-gray-100 flex items-center justify-center">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <User className="h-12 w-12 text-gray-400" />
        )}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-1">{user.name}</h3>
        <p className="text-gray-500">Member since {user.memberSince}</p>
        <button className="text-[#8a0106] hover:text-[#6d0105] mt-2">
          Change profile picture
        </button>
      </div>
    </div>
    <hr />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
      <div>
        <p className="text-sm text-gray-500">Email Address</p>
        <p>{user.email}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Phone Number</p>
        <p>{user.phone}</p>
      </div>
    </div>
    <hr />
    <div>
      <h3 className="font-medium mb-2">Account Security</h3>
      <div className="space-x-2">
        <button className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
          Change Password
        </button>
      </div>
    </div>
  </div>
);

export default ProfileInfo;
