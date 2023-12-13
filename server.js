const express = require('express')
const path = require('path')
const PORT = 7777

const app = express()

// weight to file dictionary
const table = {
  0: 'A.pdf',
  1: 'B.pdf',
  2: 'C.pdf',
}

// load assets (css, js, pdf...)
app.use('/', express.static(path.join(__dirname, 'src/assets')))

// load page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'))
})

// send requested file name
app.get('/api', (req, res) => {
  res.send(table[req.query.weight])
})

// activate server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`)
})
