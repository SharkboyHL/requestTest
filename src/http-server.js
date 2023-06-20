const { log } = require("console")
const express = require("express")
const fs = require("fs")
const { getDatabaseInstance } = require("./database")

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json())

app.post("/movies", async (req, res) => {
    const { title, source, description, thumb } = req.body
    const db = await getDatabaseInstance()
    const post = await db.run(`INSERT INTO movies(title, source, description, thumb) VALUES (?, ?, ?, ?)`,
        [title, source, description, thumb]
    )
    res.send(post)
})

app.get("/movies", async (req, res) => {
    const { id } = req.body
    const db = await getDatabaseInstance()
    const get = await db.get(`SELECT * FROM movies WHERE id=?`, [id])
    res.send(get)
})

app.put("/movies", async (req, res) => {
    const { title, source, description, thumb, id } = req.body
    const db = await getDatabaseInstance()
    const put = await db.get(`UPDATE movies SET title=?, source=?, description=?, thumb=? WHERE id=?`, [title, source, description, thumb, id])
    res.send(put)
})

app.patch("/movies", async (req, res) => {
    const db = await getDatabaseInstance()
    const patch = await db.get(`UPDATE movies SET title=?, source=?, description=?, thumb=? WHERE id=?`)
    res.send(patch) 
})

app.delete("/movies", async(req, res) => {
    const { id } = req.body
    const db = await getDatabaseInstance()
    const remove = await db.get(`DELETE FROM movies WHERE id=?`, [id])
    res.send(remove)
})

app.listen(3000, () => console.log("Servidor rodando !"))