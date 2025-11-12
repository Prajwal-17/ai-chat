import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div>
          <h1 className="text-xl">Ai Chat app</h1>
          <Link to="/chat" className="text-blue-500 underline">
            Chat
          </Link>
        </div>
      </div>
    </>
  );
};
