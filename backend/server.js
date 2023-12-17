import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'


// Configure environment variables
dotenv.config()
const port = process.env.PORT || 5001

// Create express app
const app = express()

app.use('/api/users', userRoutes)
app.get('/', (req, res) => res.send('Server is ready!'))
app.use(notFound)
app.use(errorHandler)

app.listen(port ,() => console.log(`Server started on port ${port}`))