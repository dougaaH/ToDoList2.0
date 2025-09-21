import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Acesso não autorizado." });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true }, // Retorne apenas dados seguros
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
}