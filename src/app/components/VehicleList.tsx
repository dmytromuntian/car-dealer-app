import React from 'react';

interface VehicleListProps {
  models: string[];
  error: string | null;
}

const VehicleList: React.FC<VehicleListProps> = ({ models, error }) => {
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (models.length === 0) {
    return (
      <p className="text-gray-700">
        No models found for the selected make and year.
      </p>
    );
  }

  return (
    <ul className="list-disc pl-5">
      {models.map((model, index) => (
        <li key={index} className="text-gray-700">
          {model}
        </li>
      ))}
    </ul>
  );
};

export default VehicleList;
