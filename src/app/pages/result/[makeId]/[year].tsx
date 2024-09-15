import { GetStaticPaths, GetStaticProps } from 'next';

interface Model {
  Model_ID: string;
  Model_Name: string;
}

interface ResultProps {
  models: Model[];
  makeId: string;
  year: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ResultProps> = async (context) => {
  const { makeId, year } = context.params as { makeId: string; year: string };

  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const data = await res.json();

  return {
    props: {
      models: data.Results,
      makeId,
      year,
    },
  };
};

const ResultPage = ({ models, makeId, year }: ResultProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Vehicle Models</h1>
      <p className="text-lg mb-4">
        Make ID: {makeId}, Year: {year}
      </p>
      <ul className="w-full max-w-md space-y-4">
        {models.length > 0 ? (
          models.map((model) => (
            <li
              key={model.Model_ID}
              className="p-4 border border-gray-300 rounded"
            >
              {model.Model_Name}
            </li>
          ))
        ) : (
          <p>No models found</p>
        )}
      </ul>
    </div>
  );
};

export default ResultPage;
