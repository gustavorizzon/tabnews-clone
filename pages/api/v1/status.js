export default function status(request, response) {
  return response
    .status(200)
    .json({ message: "Alunos do Curso.dev são pessoas acima da média." });
}
