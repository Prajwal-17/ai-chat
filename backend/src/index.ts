import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
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

app.get("/events-demo", async (req, res) => {
  try {
    console.log("in events-demo");
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Cache-Control", "no-cache");
    res.set("Content-Type", "text/event-stream");
    res.flushHeaders();

    let count = 0;

    const interval = setInterval(() => {
      const stock1Rate = Math.floor(Math.random() * 100000);
      const stock2Rate = Math.floor(Math.random() * 60000);
      res.write(`data: ${JSON.stringify({ stock1Rate, stock2Rate })}\n\n`);
      count++;

      if (count > 5) {
        clearInterval(interval);
        res.end();
      }
    }, 2000);

    // res.on("close", () => {
    //   clearInterval(interval);
    //   res.end();
    // });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/chat", async (req, res) => {
  console.log("get req", req.route.path);
  res.setHeader("Content-type", "text/event-stream");
  res.setHeader("Cache-control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  try {
    const { prompt } = req.body;

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log(response);

    for await (const chunk of response) {
      const text = chunk.text;
      if (text) {
        res.write(`data:${JSON.stringify({ text })}\n\n`);
      }

      // console.log(chunk.text());
    }

    res.write(`data: [DONE]\n\n`);
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
