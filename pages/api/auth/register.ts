import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Faqat POST ruxsat etiladi' });

  await connectDB();

  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "Barcha maydonlar to'ldirilishi kerak" });

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ error: 'Email band' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({ message: "Ro'yxatdan o'tildi", userId: user._id });
}
