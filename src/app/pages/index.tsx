import { useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';

interface Make {
  Make_ID: string;
  Make_Name: string;
}

const Home = () => {
  const [makes, setMakes] = useState<Make[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const fetchMakes = async () => {
      const response = await fetch(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
      );
      const data = await response.json();
      setMakes(data.Results);
    };

    fetchMakes();

    const currentYear = new Date().getFullYear();
    const modelYears = Array.from(
      { length: currentYear - 2014 },
      (_, i) => currentYear - i
    );
    setYears(modelYears);
  }, []);

  const handleMakeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(e.target.value);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const isButtonDisabled = !selectedMake || !selectedYear;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Filter Vehicles</h1>
      <div className="w-full max-w-md space-y-4">
        <select
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleMakeChange}
          value={selectedMake}
        >
          <option value="">Select Vehicle Make</option>
          {makes.map((make) => (
            <option key={make.Make_ID} value={make.Make_ID}>
              {make.Make_Name}
            </option>
          ))}
        </select>

        <select
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleYearChange}
          value={selectedYear}
        >
          <option value="">Select Model Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <Link
          href={
            isButtonDisabled ? '#' : `/result/${selectedMake}/${selectedYear}`
          }
        >
          <a
            className={`block text-center py-2 px-4 rounded ${
              isButtonDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white'
            }`}
            onClick={(e) => {
              if (isButtonDisabled) e.preventDefault();
            }}
          >
            Next
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
