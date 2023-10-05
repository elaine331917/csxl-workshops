const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/* Retrieve all prompts */
app.get('/prompts', (req, res) => {
  res.send('get all the prompts')
})

/* Retrieve prompt from id */
app.get('/prompts/:id', (req, res) => {
  const id = req.params.id

  res.send(`get prompt with id: ${id}`)
})

/* Retrieve form to create new prompt */
app.get('/prompts/new', (req, res) => {
  res.send('new prompt form')
})

/* Create new prompt */
app.post('/prompts', (req, res) => {
  res.send('create a new prompt')
})

/* Delete prompt from id */
app.delete('/prompts/:id', (req, res) => {
  const id = req.params.id
  res.send(`remove prompt with id: ${id}`)
})

/* Edit prompt from id */
app.put('/prompts/:id/edit', (req, res) => {
  const id = req.params.id
  res.send(`edit prompt with id: ${id}`)
})

/* app.put('/prompts/:id/upvote', (res, req) => {
  res.send('upvote prompt')
})

app.put('/prompts/:id/downvote', (res, req) => {
  res.send('downvote prompt')
}) */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})