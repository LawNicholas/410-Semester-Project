const express = require('express')
const app = express()

app.get('*', (req, res) => {
  res.send('Hello, World!')
})

app.listen(3000, err => {
  if (err) return console.error(err.stack)
  console.log('Server listening on port 3000')
})