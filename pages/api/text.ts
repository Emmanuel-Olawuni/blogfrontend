// pages/api/text-to-speech.ts

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { text } = req.body;
    const apiKey = process.env.TALKIFY_API_KEY; // Use environment variable for API key

    if (!text) {
      return res.status(400).json({ error: "Txt is required" });
    }

    try {
      const response = await axios.post(
        `https://talkify.net/api/speech/v1?key=${apiKey}`,
        {
          text: "Ade is a goat",
          voice: "David", // Specify the voice
          outputFormat: "mp3", // Specify the desired output format
        },
        {
          headers: {
            // 'Authorization': `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          // responseType: 'stream', // Specify the response type as stream
        }
      );

      const filePath = path.join(
        process.cwd(),
        "public",
        "audio",
        "sample.mp3"
      ); // Adjust the file path as needed
      const writer = fs.createWriteStream(filePath);

      response.data.pipe(writer);

      writer.on("finish", () => {
        res.status(200).json({ url: `/audio/sample.mp3` }); // Return the relative path to the file
      });

      writer.on("error", (err) => {
        console.error("File Write Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
