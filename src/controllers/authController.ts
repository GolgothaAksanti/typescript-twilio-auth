import { Request, Response } from 'express';
import { TwilioService } from '../plugins/twilio';
// import { generateToken } from '../utils/generateToken';
import { User } from '../models/user';

export class AuthController {
  constructor(private twilioService: TwilioService) {}

  signup = async (req: Request, res: Response): Promise<Response> => {
    const {
      firstname,
      lastname,
      phonenumber,
    }: {
      firstname: string;
      lastname: string;
      phonenumber: string;
    } = req.body;

    const user = await User.create({
      phonenumber,
      firstname,
      lastname,
    });

    await this.twilioService.sendVericationCode(phonenumber);

    return res.status(201).json({
      status: 201,
      message: `user successfully registered`,
      data: {
        phonenumber: user.phonenumber,
        fullname: `${user.firstname} ${user.lastname}`,
      },
    });
  };
}
