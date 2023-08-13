"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Modal from "../Sections/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MdOutlineSwipeRight } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import FavoriteButton from "../UI/FavoriteButton";

// Generated by https://quicktype.io

export interface DramaMovie {
  page: number;
  results: DramaResult[];
  total_pages: number;
  total_results: number;
}

export interface DramaResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Drama = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:process.env.NEXT_PUBLIC_MOVIE_KEY
    },
  };

  const { data, isLoading } = useQuery(["dramaMovieData"], async () => {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=18",
      options
    );
    return data as DramaMovie;
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

  return (
    <div className="mt-12">
      <div className="flex mx-auto gap-2 items-center">
        <h1 className="text-2xl font-bold my-2 pl-2 md:pl-16 text-[#9fbff5]">
          Top 10 Drama Movies
        </h1>
        <MdOutlineSwipeRight className="inline-block pr-1 text-[#9fbff5] text-3xl animate-swipe " />
      </div>

      <div className="px-2 h-[230px] md:h-[300px]">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          spaceBetween={10}
          grabCursor={true}
          style={{
            height: "300px",
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1300: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          <div className="flex mt-5 gap-10">
            {data?.results
              .sort((a, b) => b.popularity - a.popularity)
              .slice(0, 10)
              .map((movie, index) => {
                const MAX_WORDS = 2;
                const words = movie?.title?.split(" ");
                const title =
                  words && words.length > MAX_WORDS
                    ? words.slice(0, MAX_WORDS).join(" ") + "..."
                    : movie?.title;

                return (
                  <div
                    className="border border-zinc-700 rounded-2xl w-[470px] h-[280px]  "
                    key={`movie-${movie.id}-${index}`}
                  >
                    <SwiperSlide key={`slide-${index}`}>
                      <div className="flex my-2 justify-between items-center gap-2">
                        <div className="flex gap-2 justify-center items-center">
                          <span className="text-red-500 border-red-600 px-2 text-3xl font-bold border rounded-full">
                            {index + 1}
                          </span>
                          <span className="bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text font-bold text-md text-transparent">
                            {title}
                          </span>
                        </div>

                        <div className="flex justify-center items-center">
                          <div>
                            <FavoriteButton
                              id={movie?.id ?? 0}
                              iconSize="2xl"
                            />
                          </div>
                          <div>
                            <button className=" flex justify-center items-center mx-auto text-gray-300 font-bold hover:text-white duration-300">
                              <Modal id={movie?.id ?? 0} />
                            </button>
                          </div>
                        </div>
                      </div>
                      {movie?.backdrop_path !== null ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                          alt="Picture of the author"
                          width={500}
                          height={500}
                          className="rounded-2xl"
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
                    </SwiperSlide>
                  </div>
                );
              })}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Drama;
