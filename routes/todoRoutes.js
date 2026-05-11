import { Router } from "express";
import prisma from "../prisma.js";
import authenticationToken from "../middleware/auth.js";
const router = Router();

router.get('/', authenticationToken, async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: req.user.userId
            }
        });

        console.log('userId from token:', req.user.userId)
        console.log('todos found:', todos)

        res.json(todos)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

router.get('/:id', authenticationToken, async (req, res) => {

    try {

        const todo = await prisma.todo.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!todo) return res.status(404).json({ error: "task does not exist" })
        res.json(todo)


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/', authenticationToken, async (req, res) => {
    try {
        const todo = await prisma.todo.create({
            data: {
                title: req.body.title,
                userId: req.user.userId
            }
        })
        res.status(201).json(todo)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

router.put('/:id', authenticationToken, async (req, res) => {

    try {
        const todo = await prisma.todo.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!todo) return res.status(404).json({ error: "Task does not exist" })

        const updatedTodo = await prisma.todo.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title: req.body.title ?? todo.title,
                done: req.body.done ?? todo.done
            }
        })
        res.json(updatedTodo)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }


})

router.delete('/:id', authenticationToken, async (req, res) => {
    try {
        const todo = await prisma.todo.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!todo) return res.status(404).json({ error: "task not found" })

        await prisma.todo.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


export default router