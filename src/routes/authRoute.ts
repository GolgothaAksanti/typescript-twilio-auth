import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { AuthController } from '../controllers/authController';
import { asyncHandler } from '../middlewares/asyncHandler';
import { verifyPhoneNumber } from '../middlewares/verifyPhoneNumber';

export class AuthRoute implements IRoute {
  public path = '/auth';
  public router = Router();

  constructor(private readonly authController: AuthController) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/signup`),
      asyncHandler(verifyPhoneNumber),
      asyncHandler(this.authController.signup);
  }
}
