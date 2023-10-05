const express = require('express')
const app = express()
const port = 3000

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  console.log("here")
  res.send('Hello World!')
})

// Middleware function requestTime
const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime)

/* Retrieve all prompts */
app.get('/prompts', (req, res) => {
  const data = req.body
  
  var prompts = [
    {
      header: "Prompt Header 1",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      votes: 101,
      category: "Education",
      usage: 234
    },
    {
      header: "Prompt Header 2",
      content: "Testing 2 Lorem ipsum dolor sit amet...",
      votes: 76,
      category: "Coding",
      usage: 123
    },
    {
      header: "Prompt Header 3",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      votes: 34,
      category: "Writing",
      usage: 234
    },
    {
      header: "Prompt Header 4",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      votes: 2,
      category: "Art",
      usage: 123
    },
    {
      header: "Prompt Header 5",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      votes: 0,
      category: "Worldbuilding",
      usage: 234
    },
    {
      header: "Prompt Header 6",
      content: "Prompt v1. adipiscing e...",
      votes: 0,
      category: "Technology",
      usage: 123
    },
    {
      header: "Prompt Header 7",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      votes: 0,
      category: "Coding",
      usage: 234
    },
    {
      header: "Prompt Header 8",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      votes: 0,
      category: "Homework",
      usage: 123
    },
    {
      header: "Prompt Header 9",
      content: "Prompt v1. Lorem ipsum dolor scing elit, sed doore magna aliqua...",
      votes: -2,
      category: "Education",
      usage: 123
    },
  ];

  res.send(prompts)
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
  console.log(`Example app listening on port ${port}`);
});
