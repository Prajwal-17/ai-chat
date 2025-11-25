import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
  }),
);
const PORT = process.env.PORT;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!PORT) {
  throw new Error("Missing environment variable: PORT");
}

if (!GEMINI_API_KEY) {
  throw new Error("Missing environment variable: GEMINI_API_KEY");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get("/", (req, res) => {
  res.json({ status: "success" }).status(200);
});

app.post("/events-demo", async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Cache-Control", "no-cache");
    res.set("Content-Type", "text/event-stream");
    res.flushHeaders();

    const responseFile = "../example.txt";
    

    let count = 1;

    const interval = setInterval(() => {
      const stock1Rate = Math.floor(Math.random() * 100000);
      const stock2Rate = Math.floor(Math.random() * 60000);
      res.write(`data: ${JSON.stringify({ stock1Rate })}\n\n`);
      count++;

      if (count > 5) {
        clearInterval(interval);
        res.write("event: end\ndata: finished\n\n");
        res.end();
      }
    }, 2000);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/chat", async (req, res) => {
  res.setHeader("Content-type", "text/event-stream");
  res.setHeader("Cache-control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  try {
    const { prompt } = req.body;

    // list models
    // const models = await ai.models.list();
    // console.log(models.page);

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    // console.log(response);
    for await (const chunk of response) {
      console.log(chunk.text);
      // console.log(
      // chunk.text || chunk.candidates[0]?.content?.parts[0]?.text || "",
      // );
    }

    // for await (const chunk of response) {
    //   const text = chunk.text;
    //   if (text) {
    //     res.write(`data:${JSON.stringify({ text })}\n\n`);
    //   }

    //   // console.log(chunk.text());
    // }

    // res.write(`data: [DONE]\n\n`);
    // res.end();
    res.end();

    // res.json({
    //   status: "success",
    //   // data: response.text,
    // });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
