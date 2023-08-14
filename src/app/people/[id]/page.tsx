
'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import PeopleMovies from "@/app/components/Characters/PeopleMovies";
import { BiSolidStar } from "react-icons/bi";
import ImagePeople from "@/app/components/Characters/ImagePeople";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: number;
  };
}

// Generated by https://quicktype.io

export interface PeopleData {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: null;
  gender: number;
  homepage: null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

const Page = ({ params }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:process.env.NEXT_PUBLIC_MOVIE_KEY
    },
  };

  const { data, isLoading, isError } = useQuery(
    ["peopleData", params.id],
    async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${params.id}`,
        options
      );
      return data as PeopleData;
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
      <div className="flex justify-center bg-zinc-950 min-h-screen items-center mx-auto">
        <h1 className="text-white text-4xl font-bold absolute inset-0 flex items-center justify-center">
          Loading...
        </h1>
      </div>
    );
  }
  if (isError) {
    notFound();
  }

  const popular = Math.floor(data?.popularity || 0);

  return (
    <div 
      key={data?.id}
    className="bg-zinc-950 px-2 md:px-8 pt-20">
      <div>
        <div className="flex gap-4">

          {
            data?.profile_path ? (

              <Image
                src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`}
                width={180}
                height={180}
                alt={data?.name || "No name"}
                className="rounded-lg"
              />
            ) : (
              <Image
                src='/no-image.png'
                width={180}
                height={180}
                alt={data?.name || "No name"}
                className="rounded-lg"
              />
            )
          }
          <div>
            <h1 className="text-gray-100 text-3xl md:text-5xl">{data?.name}</h1>

            <h2 className="text-gray-300 mt-3 border-orange-500 pl-2 border-l-4 text-xl md:text-3xl">
              Biography:
            </h2>
            

            <div className="pl-3 pt-6">
              <h3 className="text-gray-300  text-lg md:text-xl">
                {data?.birthday}{" "}
                {data?.deathday ? <span>/ {data?.deathday}</span> : null}
              </h3>
              <h3>
                <span className="text-gray-300 text-lg md:text-xl">
                  Place of birth:{" "}
                </span>
                <span className="text-gray-400 text-lg md:text-xl">
                  {data?.place_of_birth || "No data"}
                </span>
              </h3>
              <h3 className="text-gray-300 text-lg md:text-xl">
                Popularity:{" "}
                <span className="text-gray-400 text-lg md:text-xl">
                  {popular}
                </span>
                <BiSolidStar className=" inline ml-1 mb-1 text-yellow-500 text-xl" />
              </h3>
              <h3>
                <span className="text-gray-300 text-lg md:text-xl">
                  Known for:{" "}
                </span>
                <span className="text-gray-400 text-lg md:text-xl">
                  {data?.known_for_department}
                </span>
              </h3>
            </div>
          </div>
        </div>

        <div className=" pr-2 lg:pr-[25rem] mt-10">
          <p className="text-gray-400 border-orange-500 pl-2 border-l-4 text-md">
            {data?.biography}
          </p>
        </div>
        {isLoaded && data ? (
          <>
            <div className="mt-10">
              <ImagePeople id={params.id ?? 0} />
            </div>
            <div className="py-10">
              <PeopleMovies id={params.id ?? 0} />
            </div>
          </>
        ) : null}

      </div>
    </div>
  );
};

export default Page;