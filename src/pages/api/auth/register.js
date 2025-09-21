// src/pages/api/auth/register.js
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    // CORREÇÃO: O modelo deve ser acessado em camelCase (user) e não PascalCase (User)
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Gera o token para o novo usuário
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Não retorne a senha no response
    const { password: _, ...userWithoutPassword } = newUser;

    // Retorna o token e os dados do usuário, assim como no login
    return res.status(201).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error("Erro no register:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
