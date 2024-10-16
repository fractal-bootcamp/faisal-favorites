import express, { NextFunction, Request, response, Response } from "express"
import cors from "cors"
import { movies } from "./movies-db"
import { PrismaClient } from "@prisma/client"
import { clerkMiddleware, clerkClient, requireAuth, getAuth } from "@clerk/express"
import { authMiddleware } from "./middlesware"
import "dotenv/config"

const app = express()
const PORT = process.env.PORT || 3000
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(clerkMiddleware())

app.get("/", (_req: Request, res: Response) => {
    res.send("Alive")
})

// Route for logged in users
app.get("/protected", requireAuth({ signInUrl: "/sign-in" }), async (req: Request, res: Response) => {
    try {
        const { userId } = req.auth
        const user = await clerkClient.users.getUser(userId)
        return res.json({ user })

    } catch (err) {
        res.status(401).json({ error: "Unauthorized access." })
    }
})

///////// GET ROUTES /////////
// Route for signin
app.get("/sign-in", (req: Request, res: Response) => {
    res.render("sign-in")
})

// Route to fetch movies from db
app.get("/movies", async (req: Request, res: Response) => {
    const { query } = req.query
    const searchQuery = Array.isArray(query) ? query[0] : query || ""
    try {
        let movies

        if (searchQuery) {
            movies = await prisma.movie.findMany({
                where: {
                    OR: [
                        {
                            title: {
                                contains: searchQuery,
                                mode: "insensitive" // for case-insensitive search
                            },
                        },
                    ],
                },
            })
        } else {
            movies = await prisma.movie.findMany() // return all movies if there is no search
        }
        res.json(movies)

    } catch (err) {
        res.status(500).json({ err: "Unable to fetch movies" })
    }
})

// Route to fetch movie tags by id from db
app.get("/movies/:id/tags", async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const movie = await prisma.movie.findUnique({
            where: { id },
        })

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" })
        }
        res.json({ tags: movie.tags })

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch movie" })
    }
})

// Route to fetch favorite movies for logged in users
app.get("/movies/favorites", requireAuth(), async (req: Request, res: Response) => {
    const { userId } = req.auth

    try {
        const user = await prisma.user.findUnique({
            where: { clerkUserId: userId },
            include: { favorite: true },
        })

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        console.log("GETTING FAVS", user.favorite)
        res.json(user?.favorite || [])
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch favorites" })
    }
})

///////// POST ROUTES /////////
// Route to create movies
app.post("/movies", async (_req: Request, res: Response) => {
    try {
        const createdMovies = await prisma.movie.createMany({
            data: movies,
            skipDuplicates: true // Avoid dublicates
        })
        res.json({ message: "Movies successfully added!", count: createdMovies.count })

    } catch (err) {
        res.status(500).json({ err: "Unable to create movies" })
    }
})

// Route to add user movie favorites
app.post("/movies/:id/favorites", authMiddleware, async (req: Request, res: Response) => {
    const { id: movieId } = req.params
    const user = req.user

    console.log("middleware of user", user)

    try {
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                favorite: {
                    connect: { id: movieId },
                },
            },
            include: { favorite: true },
        })
        res.json(updatedUser.favorite)

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Failed to favorite movie" })
    }
})

///////// PUT ROUTES /////////
// Update movie tags
app.put("/movies/:id/tags", async (req: Request, res: Response) => {
    const { id } = req.params
    const { tags } = req.body

    try {
        const updatedMovie = await prisma.movie.update({
            where: { id },
            data: { tags },
        })
        res.json(updatedMovie)

    } catch (err) {
        res.status(500).json({ error: "Failed to update tags" })
    }
})

///////// DELETE ROUTES /////////
// Delete movie tags
app.delete("/movies/:id/tags/:tag", async (req: Request, res: Response) => {
    const { id, tag } = req.params

    try {
        // Find movie to filter for tags
        const movie = await prisma.movie.findUnique({
            where: { id },
        })

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" })
        }

        // Filter tags to delete a tag
        const updatedTags = movie.tags.filter((extag) => extag !== tag)

        // Update the movie tags in db
        const updatedMovie = await prisma.movie.update({
            where: { id },
            data: { tags: updatedTags },
        })
        res.json(updatedMovie)

    } catch (err) {
        res.status(500).json({ error: "Failed to delete the tag" })
    }
})

// Remove a favorite
app.delete("/movies/:id/favorites", requireAuth(), async (req: Request, res: Response) => {
    const { userId } = req.auth
    const { id: movieId } = req.params

    try {
        const user = await prisma.user.findUnique({
            where: { clerkUserId: userId },
            include: { favorite: true },
        })

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const updatedUser = await prisma.user.update({
            where: { clerkUserId: userId },
            data: {
                favorite: {
                    disconnect: { id: movieId },
                },
            },
            include: { favorite: true }
        })
        res.json(updatedUser.favorite)

    } catch (err) {
        res.status(500).json({ error: "Failed to remove favorites" })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
})