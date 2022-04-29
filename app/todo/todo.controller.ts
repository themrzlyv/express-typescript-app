import { prisma } from '@app/config/config';
import { accessUser } from '@app/middlewares/user.middleware';
import Controller from '@app/services/utils/decorators/controller.decorator';
import { Delete, Get, Post, Put } from '@app/services/utils/decorators/handlers.decorator';
import Middleware from '@app/services/utils/decorators/middleware.decorator';
import { Request, Response } from 'express';

@Controller('/todos')
export default class TodoController {

  @Get('')
  @Middleware([accessUser])
  public async getAllTodos(req: Request, res: Response): Promise<void> {
    const todos = await prisma.todo.findMany();
    res.status(201).json({ todos });
  }

  @Post('')
  public async createTodo(req: Request, res: Response): Promise<void> {
    const { title } = req.body;
    const todo = await prisma.todo.create({
      data: {
        title,
        completed: false,
      },
    });
    res.status(201).json({ message: 'created' });
  }

  @Delete('/:id')
  public async deleteTodo(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const todo = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(201).json({ message: 'deleted' });
  }

  @Put('/:id')
  public async updateTodo(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        completed,
      },
    });
    res.status(201).json({ message: 'updated' });
  }
}
