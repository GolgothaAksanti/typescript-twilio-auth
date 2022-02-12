import { Request, Response } from 'express';
import { TwilioService } from '../plugins/twilio';
import { User } from '../models/user';
import { generateToken } from '../utils/generateToken';

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

  verifyUser = async (req: Request, res: Response): Promise<Response> => {
    const {
      phonenumber,
      code,
    }: {
      phonenumber: string;
      code: string;
    } = req.body;

    const user = await User.findOne({ phonenumber });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: 'please sign up before account verification',
      });
    }

    if (user.verified) {
      return res.status(400).json({
        status: 400,
        message: 'Your account has already verified',
      });
    }

    const verifyCode = await this.twilioService.verifyCode(phonenumber, code);

    if (!verifyCode.valid && verifyCode.status !== 'approved') {
      return res.status(400).json({
        status: 400,
        message: 'wrong verification code',
      });
    }

    await User.updateOne({ verified: true });
    const token = generateToken(user._id);

    return res.status(201).json({
      status: 201,
      message: 'user successfully created',
      data: {
        phonenumber,
        token,
      },
    });
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const { phonenumber }: { phonenumber: string } = req.body;

    const user = await User.findOne({ phonenumber });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: 'Please sign up before login',
      });
    }

    if (!user.verified) {
      await this.twilioService.sendVericationCode(phonenumber);
      return res.status(403).json({
        status: 403,
        message: 'check your sms for account verification',
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      status: 200,
      message: 'success',
      data: {
        phonenumber,
        token,
      },
    });
  };
}
