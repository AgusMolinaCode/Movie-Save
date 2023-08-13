import Hero from "@/app/components/Sections/Hero";
import Trending from "@/app/components/Trendings/Trending";
import Action from "@/app/components/Trendings/Action";
import Drama from "@/app/components/Trendings/Drama";
import TvSeries from "@/app/components/Trendings/TvSeries";
import PopularPeople from "./components/Characters/PopularPeople";

export default function Home() {
  return (
    <div className="bg-zinc-950 min-h-screen ">
      <Hero />
      <Trending />
      <Action />
      <Drama />
      <TvSeries />
      <PopularPeople />
    </div>
  );
}
