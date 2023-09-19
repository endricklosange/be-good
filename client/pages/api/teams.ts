import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUrl = "https://graph.microsoft.com/v1.0/me";
  const bearerToken = process.env.MICROSOFT_GRAPH_TOKEN;
  if (!bearerToken) {
    return res.status(401).json({ error: "Bearer token not found" });
  }
  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  }).then((response) => {
    if (!response.ok) throw new Error("La requête a échoué");
    return response.json();
  }).then((data) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=180000');
    res.status(200).json(data)
  })
    .catch((error) => { res.status(500).json({ error: error.message }) });
}
