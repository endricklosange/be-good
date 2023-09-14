import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  function handleJSON() {
    const exportDirectoryPath = `${process.cwd()}/public/export`;
    const jsonFiles = fs.readdirSync(exportDirectoryPath);
    const jsonFileNames = jsonFiles.filter((fileName) => {
      return path.extname(fileName).toLowerCase() === ".json";
    });
    for (const csvFileName of jsonFileNames) {
      const filePath = path.join(exportDirectoryPath, csvFileName);
      const jsonData = createEvent(filePath);
      let allJsonData = [];
      if (1 +1==2) {
        allJsonData.push(jsonData);
      }
      // move csv file to archive
      fs.renameSync(filePath, `${exportDirectoryPath}/archive/${csvFileName}`);
    }
  }

  function createEvent(path: string) {
    const fileData = fs.readFileSync(path, "utf-8");
    res.send(fileData);
  }
res.json(handleJSON())
/*
  async function useless() {
    try {
      const apiUrl = `https://3graph.microsoft.com/v1.0/groups/${process.env.CHANNEL_ID}/events`;
      const bearerToken = process.env.MICROSOFT_GRAPH_TOKEN;

      if (!bearerToken) {
        return res.status(401).json({ error: "Bearer token not found" });
      }
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`La requête a échoué: ${errorData.error.message}`);
      }

      const event = await response.json();
      res.status(200).json(event);
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la création de l'événement",
      });
    }
  }*/
}
