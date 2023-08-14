import { useQuery } from "@tanstack/react-query";

interface GenderData {
  id: number;
  name: string;
}

const fetchGender = async (id: number) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:process.env.NEXT_PUBLIC_MOVIE_KEY as string,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    options
  );
  const data = await response.json();

  return data.genres as GenderData[];
};

const Gender = ({ id }: { id: number }) => {
  const { data, isLoading, isError } = useQuery(["genderData", id], () =>
    fetchGender(id)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <h1 className="text-white text-4xl font-bold absolute inset-0 flex items-center justify-center">
          Loading...
        </h1>
      </div>
    )
  }

  if (isError) {
    return <div className="text-white">Error al cargar género</div>;
  }

  return (
    <div className="mt-5 flex flex-wrap justify-center mx-auto">
      {data?.map((gender) => (
        <span className="text-gray-300 text-lg mr-4" key={gender.id}>
            |{' '}
            {gender.name} 
            
        </span>
      ))}
    </div>
  );
};

export default Gender;