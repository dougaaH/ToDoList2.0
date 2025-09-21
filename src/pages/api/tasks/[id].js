import prisma from "../../../lib/prisma";
import { verifyToken } from "../../../lib/auth";

export default async function handler(req, res) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Acesso não autorizado." });
    }

    const { id } = req.query;

    switch (req.method) {
      case "PUT":
        const { title, completed } = req.body;
        const updateDoc = {};
        if (typeof title === 'string') updateDoc.title = title.trim();
        if (completed !== undefined) updateDoc.completed = completed;

        if (Object.keys(updateDoc).length === 0) {
          return res.status(400).json({ message: "Nenhum dado para atualizar." });
        }

        // First, check if the task exists and belongs to the user.
        const taskExists = await prisma.task.findFirst({
          where: { id, userId: decoded.userId },
        });

        if (!taskExists) {
          return res.status(404).json({ message: "Tarefa não encontrada ou você não tem permissão." });
        }

        // Now, update the task and get the updated document back.
        const updatedTask = await prisma.task.update({
          where: { id, userId: decoded.userId },
          data: updateDoc,
        });

        // Return the updated task object in the response.
        return res.status(200).json({ message: "Tarefa atualizada.", task: updatedTask });

      case "DELETE":
        const deletedTask = await prisma.task.deleteMany({
          where: { id, userId: decoded.userId },
        });

        return deletedTask.count > 0
          ? res.status(200).json({ message: "Tarefa removida." })
          : res.status(404).json({ message: "Tarefa não encontrada ou você não tem permissão." });

      default:
        res.setHeader("Allow", ["PUT", "DELETE"]);
        return res.status(405).json({ message: `Método ${req.method} não permitido` });
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
    console.error("Erro na API de task [id]:", err);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
}
