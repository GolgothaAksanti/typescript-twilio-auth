import { Request, Response, NextFunction } from 'express';

export const asyncHandler =
  (cb: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (err: any) {
      return res.status(500).json({
        statusCode: 5000,
        message: err.message,
      });
    }
    return true;
  };
