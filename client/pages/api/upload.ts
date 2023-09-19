import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const exportDirectoryPath = `${process.cwd()}/public/export`;
  const jsonFiles = fs.readdirSync(exportDirectoryPath);
  const jsonFileNames = jsonFiles.filter((fileName) => {
    return path.extname(fileName).toLowerCase() === ".json";
  });
  if (jsonFileNames.length === 0) return res.status(200).json({ error: "Aucun fichier JSON" });
  const allJSONData = [];
  for (const jsonFileName of jsonFileNames) {
    const filePath = path.join(exportDirectoryPath, jsonFileName);
    const jsonData = handleEvents(filePath);
    if (jsonData) {
      allJSONData.push(jsonData);
    }
    fs.renameSync(filePath, `${exportDirectoryPath}/archive/${jsonFileName}`);
  }
  return res.status(200).json(allJSONData);

  function handleEvents(path: string) {
    const fileData = fs.readFileSync(path, "utf-8");
    const apiUrl = `https://graph.microsoft.com/v1.0/groups/${process.env.CHANNEL_ID}/events`;
    if (!apiUrl) return res.status(401).json({ error: "Aucun channel ID Team" });
    const bearerToken = process.env.MICROSOFT_GRAPH_TOKEN;
    if (!bearerToken) return res.status(401).json({ error: "Aucune clé Microsoft Graph" });
    JSON.parse(fileData).forEach(async (event: any) => {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        });
        if (!response.ok) return res.status(500).json({ error: response.statusText });
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    });
    return JSON.parse(fileData);
  }
}
