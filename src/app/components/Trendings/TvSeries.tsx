"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardTilt from "../UI/CardTilt";
import Vote from "../Vote";

import { AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import TrailerSerie from "../Trailers/TrailerSerie";
import Modal from "../Sections/Modal";
import FavoriteButton from "../UI/FavoriteButton";

// Generated by https://quicktype.io

export interface TvSeries {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

const TvSeries = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:process.env.NEXT_PUBLIC_MOVIE_KEY
    },
  };

  const { data, isLoading } = useQuery(
    ["tvSeriesData"],
    async () => {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/tv/top_rated",
        options
      );
      return data as TvSeries;
    },
    {
      cacheTime: Infinity,
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <h1 className="text-white text-4xl font-bold absolute inset-0 flex items-center justify-center">
          Loading...
        </h1>
      </div>
    );
  }

  const randomIndex = Math.floor(Math.random() * (data?.results?.length ?? 0));
  const randomTvSeries = data?.results?.[randomIndex];

  const MAX_LENGTH = 200;
  const lastSpaceIndex = randomTvSeries?.overview?.lastIndexOf(" ", MAX_LENGTH);
  const overview =
    randomTvSeries?.overview || 0 > MAX_LENGTH
      ? randomTvSeries?.overview.slice(0, lastSpaceIndex) + "..."
      : randomTvSeries?.overview;

  return (
    <div>
      <div
        className="flex flex-wrap justify-center mx-auto px-2 pt-24 pb-10"
        key={randomTvSeries?.id}
      >
        <div className="max-w-[550px] ">
          <h3 className="text-white underline underline-offset-1 text-2xl text-center font-bold">
            TV Series
          </h3>
          <h1 className="text-white font-bold text-center pt-2 md:pt-5 text-5xl md:text-6xl">
            {randomTvSeries?.name}
          </h1>

          <Vote vote_average={randomTvSeries?.vote_average ?? 0} />

          <div className="flex justify-center gap-2 items-center mt-5">
            <button className="bg-red-400 text-white font-bold px-7 py-3 rounded-lg ">
              <TrailerSerie id={randomTvSeries?.id ?? 0} />
            </button>
            <div className="">
              <FavoriteButton id={randomTvSeries?.id ?? 0} iconSize="5xl" />
            </div>
          </div>
          <p className="text-gray-300 px-10 text-center text-xl mt-5">
            {overview}
          </p>
        </div>
        <div className="">
          {randomTvSeries?.backdrop_path !== null ? (
            <CardTilt
              image={`https://image.tmdb.org/t/p/original${randomTvSeries?.backdrop_path}`}
            />
          ) : (
            <Image
              src="/no-image.png"
              alt="No Image"
              width={500}
              height={500}
              className="rounded-tr-lg hidden md:flex h-full rounded-br-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TvSeries;
