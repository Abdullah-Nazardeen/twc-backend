import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    userId?: string;
  }

function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction): any {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.userId = (decoded as { userId: string }).userId;
    next();
  });
}

export default authenticateJWT;
