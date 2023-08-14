"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardTilt from "../UI/CardTilt";
import Vote from "../Vote";
import Gender from "../UI/Gender";
import Trailer from "../Trailers/Trailer";
import Search from "./Search";
import Modal from "./Modal";
import FavoriteButton from "../UI/FavoriteButton";

export interface Data {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum MediaType {
  Movie = "movie",
}

export enum OriginalLanguage {
  En = "en",
  Ja = "ja",
}

const Hero = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_MOVIE_KEY,
    },
  };

  const { data, isLoading, isError } = useQuery(["movieData"], async () => {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      options
    );
    return data as Data;
  });

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

  const randomIndex = Math.floor(Math.random() * (data?.results?.length ?? 0));
  const randomMovie = data?.results?.[randomIndex];

  const MAX_LENGTH = 200;
  const lastSpaceIndex = randomMovie?.overview?.lastIndexOf(" ", MAX_LENGTH);
  const overview =
    randomMovie?.overview || 0 > MAX_LENGTH
      ? randomMovie?.overview.slice(0, lastSpaceIndex) + "..."
      : randomMovie?.overview;

  return (
    <div>
      <div
        className="flex flex-wrap justify-center mx-auto px-2 pt-16  md:pt-24 pb-10"
        key={randomMovie?.id}
        id="#MainContent"
      >
        <div className="max-w-[550px]">
          <h1 className="text-white font-bold text-center pt-2 md:pt-5 text-5xl md:text-6xl">
            {randomMovie?.title}
          </h1>

          <Vote vote_average={randomMovie?.vote_average ?? 0} />

          <Gender id={randomMovie?.id ?? 0} />

          <div className="flex justify-center gap-2 items-center mt-5">
            <button className="bg-red-400 text-white font-bold px-7 py-3 rounded-lg ">
              <Trailer id={randomMovie?.id ?? 0} />
            </button>
            <div>
              <FavoriteButton id={randomMovie?.id ?? 0} iconSize="5xl" />
            </div>
          </div>
          <p className="text-gray-300 px-10 text-center text-xl mt-5">
            {overview}
          </p>
          <button className="bg-[#9fbff5] flex justify-center mx-auto text-gray-100 font-bold px-4 py-1 rounded-lg mt-5">
            <Modal id={randomMovie?.id ?? 0} />
          </button>
        </div>
        <div>
          <div>
            <CardTilt
              image={`https://image.tmdb.org/t/p/original${randomMovie?.backdrop_path}`}
            />
          </div>
        </div>
      </div>
      <Search />
    </div>
  );
};

export default Hero;
