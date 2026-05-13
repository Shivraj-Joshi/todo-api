import prisma from "../prisma.js";

export async function getAllTodos(userId) {
    return prisma.todo.findMany({
        where: {
            userId
        }
    });
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