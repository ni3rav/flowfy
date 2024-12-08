import "dotenv/config"
import express, { Request, Response, NextFunction } from "express"
import tasksRoute from "./routes/tasks"
import morgan from "morgan"
import createHttpError, {isHttpError} from "http-errors"

const app = express()
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/tasks", tasksRoute)


app.use((req, res, next) => {
    next(createHttpError(404, "endpoint dne"))
})

//eslint-disable-next-line
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errMessage = "unknown error"
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status
        errMessage = error.message
    }
    res.status(statusCode).json({ error: errMessage })
})

export default app