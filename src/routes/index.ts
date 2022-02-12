import { IRoute } from '../interfaces/route.interface';
import { AuthRoute } from './authRoute';
import { authController } from '../controllers';

const authRoute = new AuthRoute(authController);

export const routes: IRoute[] = [authRoute];
