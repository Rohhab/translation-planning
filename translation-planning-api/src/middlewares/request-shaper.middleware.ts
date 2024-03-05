import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class requestShaperMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    function transformObject(input) {
      const identifier = Object.keys(input).find((key) => input[key] !== '');

      const transformed = {
        identifier: input[identifier],
        password: input.password,
      };
      return transformed;
    }

    req.body = transformObject(req.body);

    next();
  }
}
