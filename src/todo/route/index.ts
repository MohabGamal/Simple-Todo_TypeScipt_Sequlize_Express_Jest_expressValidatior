import { Router } from "express";
import Middleware from '../../../middleware';
import TodoValidator from '../validator';
import TodoController from '../controller';
const todoRouter = Router();

todoRouter.post(
  '/create',
  TodoValidator.checkCreateTodo(),
  Middleware.handlevalidationError,
  TodoController.create
);

todoRouter.get(
  '/read',
  TodoValidator.checkReadTodo(),
  Middleware.handlevalidationError,
  TodoController.read
);

todoRouter.get(
  '/read/:id',
  TodoValidator.checkIdParam(),
  Middleware.handlevalidationError,
  TodoController.readById
);

todoRouter.put(
  '/update/:id',
  TodoValidator.checkIdParam(),
  Middleware.handlevalidationError,
  TodoController.update
);

todoRouter.delete(
  '/delete/:id',
  TodoValidator.checkIdParam(),
  Middleware.handlevalidationError,
  TodoController.delete
);


export default todoRouter;