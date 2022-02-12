import { AuthController } from './authController';
import { twilioService } from '../plugins/twilio';

export const authController = new AuthController(twilioService);
