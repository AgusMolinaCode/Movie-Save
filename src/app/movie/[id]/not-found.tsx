import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 bg-black">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="">
            <div className="">
              <h1 className="my-2 text-gray-200 font-bold text-2xl">
                Looks like you have found the doorway to the great nothing
              </h1>
              <p className="my-2 text-gray-200">
                Sorry about that! Please visit our hompage to get where you need
                to go.
              </p>
            </div>
          </div>
          <div>
            <Image
              width={500}
              height={500}
              alt="404"
              src="https://i.ibb.co/G9DC8S0/404-2.png"
            />
            <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
              <Link href="/">Take me there!</Link>
            </button>
          </div>
        </div>
      </div>
      <div>
        <Image
          width={500}
          height={500}
          alt="404"
          src="https://i.ibb.co/ck1SGFJ/Group.png"
        />
      </div>
    </div>
  );
}
