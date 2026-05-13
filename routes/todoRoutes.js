import { Router } from "express";
import prisma from "../prisma.js";
import authenticationToken from "../middleware/auth.js";
import * as todoController from '../controllers/todo.controller.js'
const router = Router();

router.get('/', authenticationToken, todoController.getAllTodos);

router.get('/:id', authenticationToken, todoController.getTodoById)

router.post('/', authenticationToken, todoController.createTodo)

router.put('/:id', authenticationToken, todoController.updatedTodo)

router.delete('/:id', authenticationToken, todoController.deleteTodo)


export default router