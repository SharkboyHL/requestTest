const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.static(__dirname + '/public'))

app.use("/qhrssao", (req, res) => {
    const { file, text } = req.query
    fs.writeFileSync("cachinhosGuarda.txt", "Eu amo minha namorada.")
    res.send(new Date())
})

app.listen(3000, () => console.log("Servidor rodando !"))