import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/user';

async function signup(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(email, hashedPassword);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function signin(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '', {
      expiresIn: '30d',
    });

    const isNew = user.contacts.length === 0;

    res.status(200).json({ token, newUser: isNew });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { signup, signin };
