import { Request, Response } from "express";
import { CreatePostDto } from "./dto";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../config/prisma";

export class PostCollection {
  async Create(req: Request, res: Response) {
    try {
      const dto = new CreatePostDto(req.body);

      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(StatusCodes.CONFLICT).json({
          error: errors.map((e) => e.constraints),
        });
      }

      const newPost = await prisma.post.create({
        data: {
          title: dto.title,
          description: dto.description,
          userId: dto.userId,
        },
      });

      return res.status(StatusCodes.CREATED).json({
        post: newPost,
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "something went wrong",
      });
    }
  }

  async getPosts(_req: Request, res: Response) {
    try {
      const posts = await prisma.post.findMany();
      return res.status(StatusCodes.ACCEPTED).json({
        posts: posts,
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "something went wrong",
      });
    }
  }
}
