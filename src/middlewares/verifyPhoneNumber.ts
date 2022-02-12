import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

export const verifyPhoneNumber = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { phonenumber }: { phonenumber: string } = req.body;
  const userFound = await User.findOne({ phonenumber });

  if (userFound) {
    return res.status(403).json({
      statusCode: 403,
      message: `phone number: ${phonenumber} is already used`,
    });
  }

  next();
};
