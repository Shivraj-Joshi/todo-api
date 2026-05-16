import express from 'express';
import router from './routes/todoRoutes.js';
import authRouter from './routes/auth.js'
import helmet from 'helmet';
import { authLimiter, generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestId } from './middleware/requestId.js';
import { logger } from './middleware/requestLogger.js'

const app = express()

app.use(helmet())
app.use(express.json()) // lets Express read JSON from request body
app.use(requestId)
app.use(logger)

app.use('/todos', generalLimiter)
app.use('/auth', authLimiter)
app.use('/todos', router)
app.use('/auth', authRouter)

//unknown route handler 

app.use((req, res) => {

    res.status(404).json({
        error: `cannot ${req.method} ${req.path}`
    });

})

app.use(errorHandler);

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})