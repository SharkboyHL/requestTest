const { log } = require("console")
const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.static(__dirname + '/public'))

app.use("/create", (req, res) => {
    const { file, text } = req.query
    fs.writeFileSync(file, text)
    res.send(new Date())
})

app.use("/read", (req, res) =>{
    const { file } = req.query
    const read = fs.readFileSync(file, 'utf8')
    res.send(read)
})

app.use("/update", (req, res) =>{
    const { file, text } = req.query
    const update = fs.appendFileSync(file, text)
    res.send(update)
})

app.use("/delete", (req, res) =>{
    const { file, text } = req.query
    const remove = fs.rmSync(file, text)
    res.send(remove)
})

app.listen(3000, () => console.log("Servidor rodando !"))