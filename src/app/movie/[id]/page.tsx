"use client";

import Credits from "@/app/components/Sections/Credits";
import FavoriteButton from "@/app/components/UI/FavoriteButton";
import Gender from "@/app/components/UI/Gender";
import Trailer from "@/app/components/Trailers/Trailer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { BiSolidStar } from "react-icons/bi";

interface Props {
  params: {
    id: number;
  };
}

// Generated by https://quicktype.io

export interface MovieSearchData {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

const Page = ({ params }: Props) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:process.env.NEXT_PUBLIC_MOVIE_KEY
    },
  };

  const { data, isError, isLoading } = useQuery(
    ["searchData", params.id],
    async () => {
      const { data } = await axios.get<MovieSearchData>(
        `https://api.themoviedb.org/3/movie/${params.id}`,
        options
      );
      return data;
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

  const popular = Math.floor(data?.popularity || 0);

  return (
    <div className="bg-zinc-950 min-h-screen pt-20">
      <Suspense fallback={<Loading />}>
        <div className="flex px-2 md:px-8 justify-center md:justify-start mx-auto flex-wrap gap-3">
          <div>
            {data?.poster_path ? (
              <div className="relative">
                <Image
                  src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
                  width={400}
                  height={400}
                  alt="poster"
                  className="rounded-lg "
                />
                <div className="absolute top-1 right-1 p-1  bg-black rounded-full ">
                  <FavoriteButton id={data?.id ?? 0} iconSize="5xl" />
                </div>
              </div>
            ) : (
              <Image
                src="/no-image.png"
                width={400}
                height={400}
                alt="poster"
                className="rounded-lg "
              />
            )}
          </div>

          <div className="flex-col gap-3">
            <h1 className="text-white text-4xl">{data?.title}</h1>
            <div className="">
              <Gender id={params.id} />
            </div>
            <div className="mt-8">
              <h3 className="text-gray-300 text-lg md:text-xl">
                Popularity:{" "}
                <span className="text-gray-400 text-lg md:text-xl">
                  {popular}
                </span>
                <BiSolidStar className=" inline ml-1 mb-1 text-yellow-500 text-xl" />
              </h3>

              <div className="flex gap-4 mt-8 flex-wrap">
                <div>
                  <span className="text-gray-300 border-l-4 pl-2 border-orange-500 mt-4 text-lg md:text-xl">
                    Production Country:{" "}
                  </span>
                  {data?.production_countries.map((country) => {
                    return (
                      <div className="flex-col"
                      key={country.iso_3166_1}
                      >
                        <span className="text-gray-400 text-lg md:text-xl">
                          - {country.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <span className="text-gray-300 border-l-4 pl-2 border-orange-500 text-lg mt-4 md:text-xl">
                    Production Company:{" "}
                  </span>
                  {data?.production_companies.map((company) => {
                    return (
                      <div
                      key={company.id}
                      >
                        <span className="text-gray-400 mt-3 text-lg md:text-xl">
                          - {company.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-5 mt-5">
                <Link
                  href={data?.homepage || "https://www.themoviedb.org/"}
                  target="_blank"
                  className="transition-background inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-gradient-to-r from-slate-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-black duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <p className=" text-black">Homepage</p>
                </Link>

                <div>
                  <button className="transition-background inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-gradient-to-r from-slate-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-black duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <Trailer id={params.id} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="px-2 md:px-8">
            <h1 className="text-gray-300 text-2xl mb-3">Overview:</h1>
            <h1 className="text-gray-400 border-l-4 border-orange-500 pl-4 max-w-[1100px] text-xl">
              {data?.overview}
            </h1>
          </div>
          <div className="mt-8">
            <Credits id={params.id} />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Page;

const Loading = () => {
  return (
    <div className="flex justify-center bg-zinc-950 min-h-screen items-center mx-auto">
      <h1 className="text-white text-4xl font-bold absolute inset-0 flex items-center justify-center">
        Loading...
      </h1>
    </div>
  );
};