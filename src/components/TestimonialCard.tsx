
import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  imageUrl: string;
}

const TestimonialCard = ({ quote, author, role, imageUrl }: TestimonialCardProps) => {
  return (
    <div className="card bg-white shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
      <div className="flex flex-col h-full">
        <div className="text-accent text-4xl mb-4">❝</div>
        <p className="text-blue-800 italic mb-6 flex-grow">{quote}</p>
        <div className="flex items-center">
          <div className="avatar mr-4">
            <div className="w-10 rounded-full">
              <img src={imageUrl} alt={author} />
            </div>
          </div>
          <div>
            <h4 className="font-semibold">{author}</h4>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
