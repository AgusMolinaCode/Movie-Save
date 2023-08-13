"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";
import MoviesView from "@/app/components/MoviesView";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!, {
  auth: {
    persistSession: false, //or true
  },
});

const FavoriteMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<{
    column1: number[];
    column2: number[];
    column3: number[];
  }>({
    column1: [],
    column2: [],
    column3: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId !== null) {
        setIsLoading(true); // Establecer isLoading en true al inicio de la consulta
        const { data, error } = await supabase
          .from("favorites")
          .select("hero_id, column_id")
          .eq("user_id", userId);
        if (error) {
          console.log(error);
        } else {
          const columns = {
            column1: [] as number[],
            column2: [] as number[],
            column3: [] as number[],
          };
          data.forEach((movie) => {
            const column = `column${movie.column_id}` as keyof typeof columns;
            columns[column].push(parseInt(movie.hero_id));
          });
          setFavoriteMovies(columns);
        }
        setIsLoading(false); // Establecer isLoading en false cuando se completa la consulta
      }
    };
    fetchFavorites();
  }, [userId]);

  const handleOnDragEnd = async (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn =
      `column${source.droppableId}` as keyof typeof favoriteMovies;
    const destinationColumn =
      `column${destination.droppableId}` as keyof typeof favoriteMovies;
    const items = Array.from(favoriteMovies[sourceColumn]);
    const [reorderedItem] = items.splice(source.index, 1);
    if (sourceColumn === destinationColumn) {
      items.splice(destination.index, 0, reorderedItem);
    } else {
      const newItems = Array.from(favoriteMovies[destinationColumn]);
      newItems.splice(destination.index, 0, reorderedItem);
      setFavoriteMovies({
        ...favoriteMovies,
        [sourceColumn]: items,
        [destinationColumn]: newItems,
      });

      const { data, error } = await supabase
        .from("favorites")
        .update({ column_id: parseInt(destination.droppableId) })
        .eq("hero_id", reorderedItem.toString())
        .eq("user_id", userId);
      if (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen pt-20">
      <div className="px-2  md:px-8">
        <h1 className="text-4xl text-white font-bold">My Favorite Movies: </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="flex flex-wrap justify-around gap-2 p-10 mx-auto">
              <Droppable droppableId="1">
                {(provided, snapshot: DroppableStateSnapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-[350px] bg-gray-900 rounded-2xl ${
                      snapshot.isDraggingOver ? "border-4 border-blue-500" : ""
                    }`}
                  >
                    <h2 className="text-white text-center text-3xl underline-offset-1 underline font-bold m-2">
                      To see
                    </h2>
                    {favoriteMovies.column1.map((movieId, index) => (
                      <Draggable
                        key={movieId}
                        draggableId={movieId.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <MoviesView heroIds={[movieId]} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="2">
                {(provided, snapshot: DroppableStateSnapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-[350px] bg-gray-900 rounded-2xl ${
                      snapshot.isDraggingOver ? "border-4 border-blue-500" : ""
                    }`}
                  >
                    <h2 className="text-white text-center text-3xl underline-offset-1 underline font-bold m-2">
                      Seeing
                    </h2>
                    {favoriteMovies.column2.map((movieId, index) => (
                      <Draggable
                        key={movieId}
                        draggableId={movieId.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <MoviesView heroIds={[movieId]} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="3">
                {(provided, snapshot: DroppableStateSnapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-[350px] bg-gray-900 rounded-2xl ${
                      snapshot.isDraggingOver ? "border-4 border-blue-500" : ""
                    }`}
                  >
                    <h2 className="text-white text-center text-3xl underline-offset-1 underline font-bold m-2">
                      Already seen
                    </h2>
                    {favoriteMovies.column3.map((movieId, index) => (
                      <Draggable
                        key={movieId}
                        draggableId={movieId.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <MoviesView heroIds={[movieId]} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;
