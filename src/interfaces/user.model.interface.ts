import { Document } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  phonenumber: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
