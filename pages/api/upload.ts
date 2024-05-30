import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import formidable from "formidable";
import mammoth from "mammoth";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = formidable({
    uploadDir: "./public/uploads",
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
    }
    const uploadedFile = files["file"];
    if (!uploadedFile) {
      return res.status(400).json({
        error: "No file Uploaded",
      });
    }

    const file = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;

    fs.readFile(file.filepath, async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Unable to read the uploaded file",
        });
      }
      mammoth
        .extractRawText({
          path: file.filepath,
        })
        .then((result) => {
          const text = result.value;
          const fileName = `${Date.now()}_${file.newFilename}`;
          const filepath = path.join("./public/uploads", fileName);
          fs.writeFile(filepath, data, (err) => {
            if (err) {
              return res.status(500).json({
                error: "Unable to save the uploaded file",
              });
            }

            res.status(200).json({
              text,
            });
          });
        })
        .catch((err) => {
          return res.status(500).json({
            error: "Unable to process the uploaded file",
          });
        });
    });
  });
}
