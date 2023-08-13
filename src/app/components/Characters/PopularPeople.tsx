"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";



export interface PeopleData {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}
export interface Result {
  adult: boolean;
  gender: number;
  id: number;
  known_for: KnownFor[];
  known_for_department: KnownForDepartment;
  name: string;
  popularity: number;
  profile_path: string;
}
export interface KnownFor {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  media_type: MediaType;
  original_language: OriginalLanguage;
  original_title?: string;
  overview: string;
  poster_path: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date?: string;
  name?: string;
  origin_country?: string[];
  original_name?: string;
}
export enum MediaType {
  Movie = "movie",
  Tv = "tv",
}
export enum OriginalLanguage {
  En = "en",
  Es = "es",
  Sv = "sv",
  Ta = "ta",
  Te = "te",
  Tl = "tl",
}
export enum KnownForDepartment {
  Acting = "Acting",
}
const PopularPeople = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:process.env.NEXT_PUBLIC_MOVIE_KEY
    },
  };
  const { data, isLoading, isError } = useQuery(
    ["peopleData"],
    async () => {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/person/popular",
        options
      );
      return data as PeopleData;
    },
    {
      cacheTime: Infinity,
    }
  );
  const [isHovered, setIsHovered] = useState(false);
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
    <div className=" pb-20 md:pb-32">
      <div className="my-8  pl-2 md:pl-16">
        <h1 className="text-2xl font-bold   text-[#9fbff5]">
          Top Stars of the Month 
        </h1>
        <span className='text-md underline font-semibold text-[#9fbff5]'>Click image for Details</span>
      </div>
      <div className="relative m-auto w-full h-[200px] md:h-[300px] overflow-hidden bg-transparent before:absolute before:left-0 before:top-0 before:z-[2] before:h-full  before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full  after:-scale-x-100  after:content-['']">
        <div
          className={`animate-infinite-slider flex w-[calc(350px*10)] md:w-[calc(420px*10)] ${
            isHovered ? "paused" : ""
          }`}
        >
          {data?.results.map((result) => (
            <div
              key={result.id}
            >
              <div
                className="slide flex w-[170px] md:w-[200px] h-[200px] md:h-[250px] items-center px-3 justify-center"
                key={result.id}
              >
                <div>
                  <Link className="text-white" href={`/people/${result.id}`}>
                    
                    <Image
                      className="rounded-full w-[250px] md:w-[325px] h-[200px] md:h-[250px] "
                      width={200}
                      height={200}
                      src={`https://image.tmdb.org/t/p/w500${result.profile_path}`}
                      alt={result.name}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
     
    </div>
  );
};
export default PopularPeople;
