import { useEffect, useState } from "react";

export const Chat = () => {
  const [promptInput, setPromptInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<string>();

  const handleSendMsg = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ prompt: promptInput }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      if (!response.body) {
        throw new Error("Response has no body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let aiResponse = "";
      while (true) {
        const { done, value } = await reader.read();
        // here value is the utf values

        if (done) break;
        // console.log(value);

        // decode returns string
        const chunk = decoder.decode(value, { stream: true });
        // console.log(chunk);

        // split returns array of lines
        const lines = chunk.split("\n");

        for (const line of lines) {
          const jsonStr = line.replace("data:", "");

          if (jsonStr === "[DONE]") break;

          try {
            if (jsonStr === "") {
              continue;
            }
            const data = JSON.parse(jsonStr);
            // console.log(data);

            const newText = data.text;

            aiResponse += newText;
            // setMessages((prev) => [...prev, newText]);

            // update in state
            // render in Ui
          } catch (error) {
            console.log(error);
          }
        }
        setMessages(aiResponse);
      }

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

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
            {/*<Markdown>{messages}</Markdown>*/}
          </div>
        </div>
      </div>
    </>
  );
};
