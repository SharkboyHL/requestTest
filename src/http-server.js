const { log } = require("console")
const express = require("express")
const fs = require("fs")
const { getDatabaseInstance } = require("./database")

const app = express()

app.use(express.static(__dirname + '/public'))

app.use("/create", async (req, res) => {
    const { title, source, description, thumb } = req.query
    const db = await getDatabaseInstance()
    const create = await db.run(`INSERT INTO movies(title, source, description, thumb) VALUES (?, ?, ?, ?)`,
        [title, source, description, thumb]
    )
    res.send(create)
})

app.use("/read", async (req, res) => {
    const { id } = req.query
    const db = await getDatabaseInstance()
    const read = await db.get(`SELECT * FROM movies WHERE id=?`, [id])
    res.send(read)
})

app.use("/update", async (req, res) => {
    const { title, source, description, thumb, id } = req.query
    const db = await getDatabaseInstance()
    const update = await db.get(`UPDATE movies SET title=?, source=?, description=?, thumb=? WHERE id=?`, [title, source, description, thumb, id])
    res.send(update)
})

app.use("/delete", async(req, res) => {
    const { id } = req.query
    const db = await getDatabaseInstance()
    const remove = await db.get(`DELETE FROM movies WHERE id=?`, [id])
    res.send(remove)
})

app.listen(3000, () => console.log("Servidor rodando !"))