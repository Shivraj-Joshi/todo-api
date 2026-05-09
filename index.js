import express from 'express';
import router from './routes/todoRoutes.js';
import authRouter from './routes/auth.js'


const app = express()

app.use(express.json()) // lets Express read JSON from request body

app.use('/todos', router)
app.use('/auth', authRouter)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})