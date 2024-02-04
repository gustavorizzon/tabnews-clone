import database from "../../../infra/database.js";

export default async function status(request, response) {
  const result = await database.query("SELECT 1+1 as sum;");
  console.log(result.rows);
  return response
    .status(200)
    .json({ message: "Alunos do Curso.dev são pessoas acima da média." });
}
