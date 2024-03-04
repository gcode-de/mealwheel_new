import dbConnect from "../../../db/connect";
import Recipe from "../../../db/models/Recipe";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const recipes = await Recipe.find();

    if (!recipes) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(recipes);
  }
}
