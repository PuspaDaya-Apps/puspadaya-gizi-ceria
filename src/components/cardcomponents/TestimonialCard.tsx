
import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  imageUrl: string;
  rating?: number; // Optional rating property
}

const TestimonialCard = ({ quote, author, role, imageUrl, rating }: TestimonialCardProps) => {
  // Render star rating
  const renderStars = () => {
    const stars = [];
    const ratingValue = rating !== undefined ? rating : 0;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-xl ${i <= ratingValue ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl h-full flex flex-col">
      <div className="text-accent text-4xl mb-4">❝</div>
      <p className="text-blue-800 italic mb-4 flex-grow text-base md:text-lg">{quote}</p>
      
      {rating !== undefined && (
        <div className="mb-3">
          {renderStars()}
        </div>
      )}
      
      <div className="flex items-center mt-auto pt-2">
        {imageUrl ? (
          <div className="avatar mr-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={imageUrl} alt={author} className="w-full h-full object-cover" />
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-4">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="font-semibold text-base">{author}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
