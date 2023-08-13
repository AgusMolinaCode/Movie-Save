import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

interface Props {
  id: number;
}

// Generated by https://quicktype.io

export interface CreditsData {
  id: number;
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: Department;
  job?: string;
}

export enum Department {
  Acting = "Acting",
  Art = "Art",
  Camera = "Camera",
  CostumeMakeUp = "Costume & Make-Up",
  Crew = "Crew",
  Directing = "Directing",
  Editing = "Editing",
  Production = "Production",
  Sound = "Sound",
  VisualEffects = "Visual Effects",
  Writing = "Writing",
}

const Credits = ({ id }: Props) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:process.env.NEXT_PUBLIC_MOVIE_KEY
    },
  };

  const { data, isLoading, isError } = useQuery(
    ["creditsData", id],
    async () => {
      const { data } = await axios.get<CreditsData>(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        options
      );
      return data as CreditsData;
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5 bg-zinc-950 h-screen  items-center mx-auto">
        <h1 className="text-white text-4xl font-bold flex items-center justify-center">
          Loading...
        </h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center mt-20 bg-zinc-950 align-middle items-center mx-auto">
        <h1 className="text-white text-4xl font-bold flex items-center justify-center">
          Error...
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div className="relative m-auto w-full overflow-hidden bg-white before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full  after:-scale-x-100 after:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] after:content-['']">
        <div className="animate-infinite-slider flex w-[calc(250px*10)]">
          {data?.cast
            .slice(0, 10)
            .sort((a, b) => a.order! - b.order!)
            .map((cast) => (
              <div
                key={cast.id}
                className="flex flex-col items-center justify-center w-[250px] h-[400px] bg-zinc-950"
              >
                <Link href={`/people/${cast.id}`}>
                  {cast.profile_path === null ? (
                    <Image
                      className="w-[200px] h-[300px] object-cover rounded-lg"
                      src='/image-not.png'
                      alt={cast.name}
                      width={200}
                      height={300}
                    />
                  ) : (
                    <Image
                      className="w-[200px] h-[300px] object-cover rounded-lg"
                      src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                      alt={cast.name}
                      width={200}
                      height={300}
                    />
                  )}

                  <h1 className="text-gray-200 text-xl font-bold">
                    {cast.name}
                  </h1>
                  <p className="text-gray-400 text-sm">{cast.character}</p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Credits;