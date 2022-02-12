import dotenv from 'dotenv';
import { twilioClient } from './twilioConfig';
import { ITwilioResponse } from '../../interfaces/twilio.interface';
dotenv.config();

const { TWILIO_SERVICE_ID, TWILIO_CHANNEL } = process.env;

export class TwilioService {
  sendVericationCode = async (
    phoneNumber: string,
  ): Promise<ITwilioResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await twilioClient.verify
          .services(`${TWILIO_SERVICE_ID}`)
          .verifications.create({
            to: phoneNumber,
            channel: `${TWILIO_CHANNEL}`,
          });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };

  verifyCode = async (
    phoneNumber: string,
    code: string,
  ): Promise<ITwilioResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await twilioClient.verify
          .services(`${TWILIO_SERVICE_ID}`)
          .verificationChecks.create({
            to: phoneNumber,
            code,
          });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
}
