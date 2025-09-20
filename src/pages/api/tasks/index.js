// Exemplo: pages/api/tasks/index.js
import clientPromise from '../../../lib/mongo';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB_NAME); // Use a variável de ambiente correta

      const { title, userId } = req.body;

      // Validação básica
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
      res.status(201).json({ message: 'Task criada com sucesso!', task: result.ops[0] });

    } catch (e) {
      // Log do erro completo no console do servidor
      console.error("ERRO AO CRIAR TASK:", e);
      res.status(500).json({ message: 'Erro ao conectar ou inserir no banco de dados.', error: e.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
