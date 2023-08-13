import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

// Generated by https://quicktype.io

export interface ImageData {
  id: number;
  profiles: Profile[];
}

export interface Profile {
  aspect_ratio: number;
  height: number;
  iso_639_1: null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

const ImagePeople = ({ id }: { id: number }) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:process.env.NEXT_PUBLIC_MOVIE_KEY,
    },
  };

  const { data, isLoading, isError } = useQuery(
    ["imageData", id],
    async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${id}/images`,
        options
      );
      return data as ImageData;
    },
    {
      cacheTime: Infinity,
    }
  );

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
    return (
      <div className="flex justify-center items-center mx-auto">
        <h1 className="text-white text-4xl font-bold absolute inset-0 flex items-center justify-center">
          Error...
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2 className="text-gray-300 my-3 border-orange-500 pl-2 border-l-4 text-xl md:text-3xl">
          Images:
        </h2>
        <div className="flex flex-wrap justify-center md:justify-start mx-auto gap-1 md:gap-4">
          {data?.profiles.slice(0, 5).map((profile) => (
            <div className="flex" key={profile.file_path}>
              
              {profile.file_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${profile.file_path}`}
                  width={180}
                  height={180}
                  alt="profile"
                  className="rounded-lg md:w-[300] md:h-[300] w-[180] h-[180]"
                />
              ) : (
                <Image
                  src="/no-image.png"
                  width={180}
                  height={180}
                  alt="profile"
                  className="rounded-lg md:w-[300] md:h-[300] w-[180] h-[180]"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePeople;
