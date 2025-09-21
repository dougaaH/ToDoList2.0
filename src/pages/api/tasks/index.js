import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Acesso não autorizado." });
    }
    const { userId } = decoded;

    if (req.method === 'GET') {
      const tasks = await prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(tasks);
    }

    if (req.method === 'POST') {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ message: 'O título é obrigatório.' });
      }

      const newTask = await prisma.task.create({
        data: {
          title,
          userId,
        },
      });

      return res.status(201).json({ message: 'Task criada com sucesso!', task: newTask });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (e) {
    if (e.name === 'JsonWebTokenError' || e.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
    console.error("ERRO AO PROCESSAR TASK:", e);
    res.status(500).json({ message: 'Erro no servidor.', error: e.message });
  }
}