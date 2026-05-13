import * as  todoServices from '../services/todo.service.js'

export async function getAllTodos(req, res) {
    try {
        const todos = await todoServices.getAllTodos(req.user.userId);
        res.json(todos)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getTodoById(req, res) {
    try {

        const todo = await todoServices.getTodoById(req.params.id);
        if (!todo) return res.status(404).json({ error: ' task does not exist' });
        res.json(todo)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function createTodo(req, res) {
    try {
        const todo = await todoServices.createTodo(req.user.userId, req.body.title);
        res.status(201).json(todo)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function updatedTodo(req, res) {
    try {

        const existing = await todoServices.getTodoById(req.params.id);
        if (!existing) return res.status(404).json({ error: "Task does not exist" })

        const update = await todoServices.updateTodo(
            req.params.id,
            req.body.title,
            req.body.done,
            existing
        );

        res.json(update)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

export async function deleteTodo(req, res) {
    try {
        const todo = await todoServices.getTodoById(req.params.id);
        if (!todo) return res.status(404).json({ error: "Task not found" })

        await todoServices.deleteTodo(req.params.id)
        res.status(201).json({ error: "Task deleted successfully" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}