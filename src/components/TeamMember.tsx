
import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  isOnline?: boolean;
}

const TeamMember = ({ name, role, description, imageUrl, isOnline = false }: TeamMemberProps) => {
  return (
    <div className="card bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="card-body items-center text-center">
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-24 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
            <img src={imageUrl} alt={name} />
          </div>
        </div>
        <h3 className="text-lg text-blue-600 font-semibold mt-4">{name}</h3>
        <p className="text-base text-gray-600 font-medium">{role}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default TeamMember;
