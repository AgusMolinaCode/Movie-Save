"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";


interface Props {
  id: number;
}

interface MovieData {
  id: number;
  title: string;
  poster_path: string;
  popularity: number;
}

const PeopleMovies = ({ id }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:process.env.NEXT_PUBLIC_MOVIE_KEY
    },
  };

  const { data, isLoading, isError } = useQuery(
    ["peopleMovies", id],
    async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${id}/movie_credits`,
        options
      );
      return data.cast as MovieData[];
    },
    {
      cacheTime: Infinity,
    }
  );

  useEffect(() => {
    setIsLoaded(true);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <h1 className="text-white text-4xl font-bold absolute inset-0 flex items-center justify-center">
          Loading...
        </h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <h1 className="text-white text-4xl font-bold absolute inset-0 flex items-center justify-center">
          Error...
        </h1>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-gray-300 my-5 border-orange-500 pl-2 border-l-4 text-xl md:text-3xl">
        Popular movies featuring:
      </h2>
      {isLoaded && data ? (
        <div 
        
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 6)
            .map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div key={movie.id} className="relative ">
                  {movie?.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      layout="responsive"
                      width={200}
                      height={200}
                      className="rounded-md w-[200px] h-[200px]"
                    />
                  ) : (
                    <Image
                      src="/no-image.png"
                      alt={movie.title}
                      layout="responsive"
                      width={200}
                      height={200}
                      className="rounded-md w-[200px] h-[200px]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-md"></div>
                  <div className="absolute inset-1 flex items-end justify-center">
                    <h1 className="text-white text-2xl font-bold">
                      {movie?.title}
                    </h1>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      ) : null}
    </>
  );
};

export default PeopleMovies;
