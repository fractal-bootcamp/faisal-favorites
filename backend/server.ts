import express from "express"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ origin: "*" }))

app.get("/", (_req, res) => {
    res.send("Alive")
})


app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
})