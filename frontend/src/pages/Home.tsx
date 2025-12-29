import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div>
          <h1 className="py-4 text-2xl font-bold">Ai Chat app</h1>
          <div className="flex justify-between gap-10">
            <div>
              <ul className="space-x-2">
                <li>
                  <Link to="/demo" className="text-blue-500 underline">
                    Stream Demo
                  </Link>
                </li>
                <li>
                  <Link to="/response-demo" className="text-blue-500 underline">
                    Response Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <Link to="/raw/chat" className="text-blue-500 underline">
                    Raw Api Chat
                  </Link>
                </li>
                <li>
                  <Link
                    to="/openrouter/chat"
                    className="text-blue-500 underline"
                  >
                    Open Router Api Chat
                  </Link>
                </li>
                <li>
                  <Link to="/aisdk/chat" className="text-blue-500 underline">
                    Vercel AI SDK Chat
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
