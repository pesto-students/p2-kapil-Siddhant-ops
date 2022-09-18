import { NextFunction, Request, Response } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const bearerHeader = req.headers.authorization;

    const bearer = bearerHeader.split(".");

    const bearerToken = bearer[1];

    if (bearerToken) {
      req.token = bearerToken;
      next();
    } else {
      return res.status(403).json({
        message: "There is no valid jwt token in the header",
      });
    }
  } else {
    return res.status(403).json({
      message: "There is no jwt token in the header",
    });
  }
};

export { verifyToken };
