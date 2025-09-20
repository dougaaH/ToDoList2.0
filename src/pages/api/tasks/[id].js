import clientPromise from "../../../lib/mongo";
import { verifyToken } from "../../../lib/auth";
import { ObjectId } from "mongodb";

const DB_NAME = process.env.MONGO_DB_NAME;
const COLLECTION_NAME = "tasks";

export default async function handler(req, res) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || !decoded.userId)
      return res.status(401).json({ error: "Acesso não autorizado." });

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const tasksCollection = db.collection(COLLECTION_NAME);

    const { id } = req.query;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "ID inválido." });

    const query = { _id: new ObjectId(id), userId: decoded.userId };

    switch (req.method) {
      case "PUT":
        const { title, completed } = req.body;
        const updateDoc = {};
        if (title !== undefined) updateDoc.title = title.trim();
        if (completed !== undefined) updateDoc.completed = completed;

        const updateResult = await tasksCollection.updateOne(query, { $set: updateDoc });
        return updateResult.matchedCount > 0
          ? res.status(200).json({ message: "Tarefa atualizada." })
          : res.status(404).json({ error: "Tarefa não encontrada." });

      case "DELETE":
        const deleteResult = await tasksCollection.deleteOne(query);
        return deleteResult.deletedCount > 0
          ? res.status(200).json({ message: "Tarefa removida." })
          : res.status(404).json({ error: "Tarefa não encontrada." });

      default:
        res.setHeader("Allow", ["PUT", "DELETE"]);
        return res.status(405).json({ error: `Método ${req.method} não permitido` });
    }
  } catch (err) {
    console.error("Erro na API de task [id]:", err);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}
