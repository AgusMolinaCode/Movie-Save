import { useState, MouseEvent, useCallback, Suspense } from "react";
import Image from "next/image";

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

const CardTilt = ({ image }: { image: string }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const onMouseMove = useCallback(
  throttle((e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = (y - centerY) / 98;
    const rotateY = (centerX - x) / 98;

    setRotate({ x: rotateX, y: rotateY });
  }, 100),
  []
);

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <div
        className="card relative mt-10 md:mt-0 h-[280px] md:h-[450px] lg:h-[450px] xl:h-[500px] w-screen   md:w-[600px] xl:w-[700px] 2xl:w-[900px] rounded-2xl bg-white transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(0.95, 0.95, 0.95)`,
          transition: "all 800ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        }}
      >
    
          <div
            className="group relative flex h-full w-full select-none  items-center justify-center rounded-lg "
            style={{ backgroundColor: isLoading ? "black" : "transparent" }}
          >
            <div className="absolute duration-700 -inset-0.5 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#f2f0ff] opacity-40 blur-lg transition group-hover:opacity-95" />
            <span className="text-md bg-gradient-to-t from-neutral-400 to-white bg-clip-text font-bold text-transparent">
              <Image
                src={image}
                alt="Album cover"
                fill
                className=" xl:w-[700px] 2xl:w-[900px] xl:h-[400px] 2xl:h-[550px] h-[500px] rounded-xl"
                onLoad={handleImageLoad}
              />
            </span>
          </div>
    
      </div>
    </>
  );
};

export default CardTilt;

const Loading = () => {
  return (
    <div className="bg-black h-screen flex justify-center w-full">
      <h1 className="text-white text-4xl">Cargando Imagen...</h1>
    </div>
  );
};
