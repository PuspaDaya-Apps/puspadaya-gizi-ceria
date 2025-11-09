
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="card bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="card-body items-center text-center">
        <div className="text-primary text-4xl mb-4">
          {icon}
        </div>
        <h3 className="card-title text-blue-600 text-xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
