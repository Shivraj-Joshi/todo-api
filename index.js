import express from 'express';
import router from './routes/todoRoutes.js';
import authRouter from './routes/auth.js'
import helmet from 'helmet';
import { authLimiter, generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express()

app.use(helmet())
app.use(express.json()) // lets Express read JSON from request body

app.use('/todos', generalLimiter)
app.use('/auth', authLimiter)
app.use('/todos', router)
app.use('/auth', authRouter)

app.use(errorHandler);

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})