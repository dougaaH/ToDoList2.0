import clientPromise from "@/lib/mongo";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB_NAME);

      const { title, userId } = req.body;

      if (!title || !userId) {
        return res.status(400).json({ message: 'Título e ID do usuário são obrigatórios.' });
      }

      console.log(`Inserindo task: { title: "${title}", userId: "${userId}" } no banco: "${process.env.MONGODB_DB_NAME}"`);

      const result = await db.collection('tasks').insertOne({
        title,
        userId,
        completed: false,
        createdAt: new Date(),
      });

      console.log('Task inserida com sucesso:', result);
      // A propriedade `ops` foi depreciada. Use `insertedId` para obter o ID.
      const insertedTask = await db.collection('tasks').findOne({ _id: result.insertedId });

      res.status(201).json({ message: 'Task criada com sucesso!', task: insertedTask });

    } catch (e) {
      console.error("ERRO AO CRIAR TASK:", e);
      res.status(500).json({ message: 'Erro ao conectar ou inserir no banco de dados.', error: e.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}