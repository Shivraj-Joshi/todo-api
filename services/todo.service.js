import { promise } from "zod";
import prisma from "../prisma.js";

export async function getAllTodos(userId, { page, limit, sortby, done, order }) {
    const skip = (page - 1) * limit;

    const where = { userId };
    if (done !== undefined) {
        where.done = done;
    }

    const [todos, total] = await Promise.all([
        prisma.todo.findMany({
            where,
            skip,
            take: limit,
            orderBy: { [sortby]: order }
        }),
        prisma.todo.count({ where })
    ]);
    return {
        data: todos,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    }

    // return prisma.todo.findMany({
    //     where: {
    //         userId
    //     }
    // });
}

export async function getTodoById(id) {
    return prisma.todo.findUnique({
        where: {
            id: Number(id)
        }
    });
}

export async function createTodo(userId, title) {
    return prisma.todo.create({
        data: {
            userId,
            title
        }
    });
}

export async function updateTodo(id, title, done, existingTodo) {
    return prisma.todo.update({
        where: {
            id: Number(id)
        },
        data: {
            title: title ?? existingTodo.title,
            done: done ?? existingTodo.done
        }

    });
}

export async function deleteTodo(id) {
    return prisma.todo.delete({
        where: {
            id: Number(id)
        }
    });
}