import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não informado" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    res.status(200).json({ user: { id: user.id, email: user.email } });
  } catch {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
