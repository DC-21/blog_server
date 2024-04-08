import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserRequest extends Request {
  id?: string;
  username?: string;
}

export const authorization = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Unauthorized access, please login",
    });
  }
  req.headers["auth-token"] = token;

  try {
    const user = jwt.verify(
      token,
      `${process.env.ACCESS_TOKEN_SECRET}`
    ) as JwtPayload;
    req.id = user.sub as string;
    req.username = user?.username as string;
    next();
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};
