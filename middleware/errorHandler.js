export function errorHandler(err, req, res, next) {
    console.error(err);

    //zod validation error
    if (err.name === 'ZodError') {
        return res.status(400).json({
            error: 'Validation error',
            details: err.issues.map(e => ({
                field: e.path.join('.'),
                message: e.message
            }))
        });
    }

    // prisma error 

    if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Record not found' })
    }

    // default error fallback for everything else

    res.status(500).json({ error: err.message || 'something went wrong' })

}