import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import FavoriteButton from "./UI/FavoriteButton";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  heroIds: number[];
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!)


const MoviesView = ({ heroIds }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:process.env.NEXT_PUBLIC_MOVIE_KEY as string,
    },
  };

  const { isLoading, isError } = useQuery<Movie[]>(
    ["movies", heroIds],
    async () => {
      const promises = heroIds.map((id) =>
        fetch(`https://api.themoviedb.org/3/movie/${id}`, options).then((res) =>
          res.json()
        )
      );
      const movies = await Promise.all(promises);
      return movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
      }));
    },
    {
      onSuccess: (data) => {
        setMovies(data);
      },
     
    }
  );

  const handleDeleteMovie = async (id: number) => {
    await supabase.from("movies").delete().eq("id", id);
    const newMovies = movies.filter((movie) => movie.id !== id);
    setMovies(newMovies);
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(movies);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setMovies(items);
  };

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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="movies">
        {(provided) => (
          <div
            className="flex-col gap-4 mt-14"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {movies.map((movie, index) => (
              <Draggable
                key={movie.id}
                draggableId={movie.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    className="flex-col justify-center items-center mx-auto gap-2 "
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="flex-col justify-center p-2 mx-auto">
                      <Image
                        width={400}
                        height={400}
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.title}
                        className="rounded-tl-xl rounded-tr-xl"
                      />
                      <div className="flex justify-around p-2 bg-slate-700 rounded-bl-xl rounded-br-xl">
                        <FavoriteButton
                          id={movie?.id}
                          iconSize="3xl"
                          onDelete={() => handleDeleteMovie(movie.id)}
                        />
                        <h2 className="text-white text-center text-lg">
                          {movie.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default MoviesView;
