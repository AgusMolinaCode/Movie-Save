import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="bg-cover bg-center flex justify-center items-center h-screen"
      style={{ backgroundImage: `url('/netflix.jpeg')` }}
    >
      <SignUp />
    </div>
  )
}