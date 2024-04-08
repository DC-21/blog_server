import { Request, Response } from "express";
import { LoginDto, RegistorDto } from "./dto";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { compare, hash } from "bcrypt";
import { prisma } from "../config/prisma";
import * as jwt from "jsonwebtoken";

export class UserCollection {
  async Register(req: Request, res: Response) {
    try {
      const dto = new RegistorDto(req.body);

      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(StatusCodes.CONFLICT).json({
          error: errors.map((e) => e.constraints),
        });
      }

      const isEmail = await prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (isEmail) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "email exists",
        });
      }

      const hashPassword = await hash(dto.password, 10);

      const user = await prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password: hashPassword,
        },
      });

      return res.status(StatusCodes.CREATED).json({
        user: user,
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "something went wrong",
        error: error,
      });
    }
  }

  async Login(req: Request, res: Response) {
    try {
      const dto = new LoginDto(req.body);

      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(StatusCodes.CONFLICT).json({
          error: errors.map((e) => e.constraints),
        });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "user not found",
        });
      }

      const match = await compare(dto.password, user.password);

      if (!match) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "incorrect password",
        });
      }

      const payload = {
        sub: user.id,
        lastname: user.username,
        email: user.email,
      };

      const token = jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`);

      return res.status(StatusCodes.OK).json({
        username: user.username,
        email: user.email,
        token: token,
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "something went wrong",
        error: error,
      });
    }
  }
}
