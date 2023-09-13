import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
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
  })
    .then((response) => {
      // Vérifiez si la réponse est OK (code 200)
      if (!response.ok) {
        throw new Error("La requête a échoué");
      }
      // Convertissez la réponse JSON en objet JavaScript
      return response.json();
    })
    .then((data) => {
      // Affichez les données dans la console
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error("Une erreur s'est produite :", error);
    });
}
