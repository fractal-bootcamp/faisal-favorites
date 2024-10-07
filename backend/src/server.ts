import express, { Request, Response } from "express"
import cors from "cors"
import { movies } from "./movies-db"
import { PrismaClient } from "@prisma/client"

const app = express()
const PORT = process.env.PORT || 3000
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors({ origin: "*" }))

app.get("/", (_req: Request, res: Response) => {
    res.send("Alive")
})

// Route to fetch movies from db
app.get("/movies", async (_req: Request, res: Response) => {
    try {
        const movies = await prisma.movie.findMany()
        res.json(movies)
    } catch (err) {
        res.status(500).json({ err: "Unable to fetch movies" })
    }
})

// Route to create movies
app.post("/movies", async (_req: Request, res: Response) => {
    try {
        const createdMovies = await prisma.movie.createMany({
            data: movies,
            skipDuplicates: true // Avoid dublicates
        })
        res.json({ message: "Movies successfully added!", count: createdMovies.count })
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Unable to create movies" })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
})