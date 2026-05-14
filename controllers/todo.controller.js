import * as  todoServices from '../services/todo.service.js'
import { createTodoSchema, updatedTodoSchema } from '../validators/todo.validator.js';

export async function getAllTodos(req, res, next) {
    try {
        const todos = await todoServices.getAllTodos(req.user.userId);
        res.json(todos)
    } catch (error) {
        next(error);
    }
}

export async function getTodoById(req, res, next) {
    try {

        const todo = await todoServices.getTodoById(req.params.id);
        if (!todo) return res.status(404).json({ error: ' task does not exist' });
        res.json(todo)
    } catch (error) {
        next(error);
    }
}

export async function createTodo(req, res, next) {
    try {
        const parsed = createTodoSchema.parse(req.body)
        const todo = await todoServices.createTodo(req.user.userId, parsed.title);
        res.status(201).json(todo)
    } catch (error) {
        next(error);
    }
}

export async function updatedTodo(req, res, next) {
    try {
        const parsed = updatedTodoSchema.parse(req.body)
        const existing = await todoServices.getTodoById(req.params.id);
        if (!existing) return res.status(404).json({ error: "Task does not exist" })

        const update = await todoServices.updateTodo(
            req.params.id,
            parsed.title,
            parsed.done,
            existing
        );

        res.json(update)

    } catch (error) {
        next(error);
    }

}

export async function deleteTodo(req, res, next) {
    try {
        const todo = await todoServices.getTodoById(req.params.id);
        if (!todo) return res.status(404).json({ error: "Task not found" })

        await todoServices.deleteTodo(req.params.id)
        res.status(201).json({ error: "Task deleted successfully" })

    } catch (error) {
        next(error);
    }
}