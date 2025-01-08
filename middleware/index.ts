import { NextFunction as Next, Request as Req, Response as Res } from 'express';
import { validationResult } from 'express-validator';

class Middleware {
  handlevalidationError(req: Req, res: Res, next: Next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}

export default new Middleware();
