import express from 'express';
import router from './routes/todoRoutes.js';

const app = express()

app.use(express.json()) // lets Express read JSON from request body

app.use('/todos', router)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})