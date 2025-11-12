import { useState } from "react";
import Markdown from "react-markdown";

export const Chat = () => {
  const [promptInput, setPromptInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMsg = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptInput,
        }),
      });
      // const data = await response.json();
      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        console.log("Received", value);
      }
      const eventSource = new EventSource("http://localhost:3000/api/chat");

      // setLoading(false);
      // console.log(data.data);
      // setAnswer(data.data);
      // console.log(data);
      eventSource.onmessage = (event) => {
        console.log(event.data);
      };
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div className="flex h-full min-h-screen items-center justify-center overflow-auto bg-black text-white">
          <div className="mx-4 w-3xl space-y-4 px-4">
            <h1 className="text-3xl font-semibold">Ai chat app</h1>
            <textarea
              rows={6}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Ask anything"
              translate="no"
              className="w-full rounded-xl border border-neutral-600 bg-neutral-900 px-4 py-4"
            />
            <button
              onClick={handleSendMsg}
              className="cursor-pointer rounded-xl bg-neutral-400 px-4 py-2 text-black"
            >
              Send
            </button>
            {/*{loading && <div>Loading ...</div>}*/}
            <Markdown>{answer}</Markdown>
          </div>
        </div>
      </div>
    </>
  );
};
