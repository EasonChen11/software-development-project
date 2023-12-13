const express = require('express')
const path = require('path')
const PORT = 7777

const app = express()

const table = {
  0: 'A.pdf',
  1: 'B.pdf',
  2: 'C.pdf',
}

app.use('/', express.static(path.join(__dirname, 'src/assets')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'))
})

app.get('/api', (req, res) => {
  res.send(table[req.query.weight])
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`)
})
