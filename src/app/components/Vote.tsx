import { BsStarFill } from "react-icons/bs";

const Vote = ({ vote_average }: { vote_average: number }) => {
  const roundedVote = Math.floor(vote_average);

  const stars = [];
  for (let i = 0; i < roundedVote; i++) {
    stars.push(
      <BsStarFill
        key={i}
        className="text-yellow-500 text-xl  mr-1"
      />
    );
  }

  if (roundedVote === 0) {
    stars.push(
      <BsStarFill
        key={roundedVote}
        className="text-yellow-500 text-xl  mr-1"
      />
    );
  }

  return (
    <div className="flex items-center justify-center mt-5 gap-2">
      <h1 className="text-white font-bold text-2xl">{roundedVote}.0</h1>
      <div className='flex justify-center items-center'>{stars}</div>
    </div>
  );
};

export default Vote;