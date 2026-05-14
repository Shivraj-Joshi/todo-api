import { z } from 'zod';

export const createTodoSchema = z.object({
    title: z.string({ required_error: "Title is required" })
        .min(1, 'title can not be empty')
        .max(100, 'Title cannot exceed 100 characters')
});

export const updatedTodoSchema = z.object(
    {
        title: z.string()
            .min(1, 'title can not be empty')
            .max(100, 'Title cannot exceed 100 characters')
            .optional(),
        done: z.boolean({ invalid_type_error: 'done must be true or falls' })
            .optional()

    });
