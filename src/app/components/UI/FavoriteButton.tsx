import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  id: number;
  defaultIsFavorite?: boolean;
  iconSize?: string;
  onDelete?: () => void; // Agrega una función de actualización de estado opcional
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!, {
  auth: {
    persistSession: false, //or true
  },
});

const FavoriteButton = ({
  id,
  defaultIsFavorite = false,
  iconSize = "3.2rem",
  onDelete,
}: Props) => {
  const [localIsFavorite, setLocalIsFavorite] = useState(defaultIsFavorite);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId !== null) {
        const { data, error } = await supabase
          .from("favorites")
          .select("*")
          .eq("user_id", userId)
          .eq("hero_id", id);
          
        if (error) {
          console.log(error);
        } else {
          if (data.length > 0) {
            setLocalIsFavorite(true);
          } else {
            setLocalIsFavorite(false);
          }
        }
      }
    };
    fetchFavorites();
  }, [userId, id]);

  const toggleFavorite = async () => {
  if (userId === null) {
    toast.error("Please Login to save your favorite movie", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return;
  }

  if (!localIsFavorite) {
    setLocalIsFavorite(true);
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", userId)
      .eq("hero_id", id);

    if (error) {
      console.log(error);
    } else {
      if (data.length === 0) { // Verifica si la película ya está en la lista de favoritos
        const { data, error } = await supabase.from("favorites").insert({
          user_id: userId,
          hero_id: id,
          column_id: 1,
        });
        if (error) {
          console.log(error);
        } else {
          toast.success("Saved movie", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    }
  } else {
    setLocalIsFavorite(false);
    await deleteFavorite();
    if (onDelete) {
      onDelete();
    }
  }
};
  const deleteFavorite = async () => {
    const { data, error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("hero_id", id);
    if (error) {
      console.log(error);
    } else {
      toast.success("Movie deleted successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <button className="" onClick={toggleFavorite}>
        {localIsFavorite && userId !== null ? (
          <AiFillHeart
            className={`inline-block text-red-500 text-${iconSize}`}
          />
        ) : (
          <AiOutlineHeart
            className={`inline-block text-gray-300 text-${iconSize}`}
          />
        )}
      </button>
    </div>
  );
};

export default FavoriteButton;