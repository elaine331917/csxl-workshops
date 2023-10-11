const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Middleware function requestTime
const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime)

// temporary mock data for prompts
var prompts = [
  {
    id: 1,
    header: "Prompt Header 1",
    content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    votes: 101,
    category: "Education",
    usage: 234
  },
  {
    id: 2,
    header: "Prompt Header 2",
    content: "Testing 2 Lorem ipsum dolor sit amet...",
    votes: 76,
    category: "Coding",
    usage: 123
  },
  {
    id: 3,
    header: "Prompt Header 3",
    content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    votes: 34,
    category: "Writing",
    usage: 234
  },
  {
    id: 4, 
    header: "Prompt Header 4",
    content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    votes: 2,
    category: "Art",
    usage: 123
  },
  {
    id: 5, 
    header: "Prompt Header 5",
    content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    votes: 0,
    category: "Worldbuilding",
    usage: 234
  },
  {
    id: 6, 
    header: "Prompt Header 6",
    content: "Prompt v1. adipiscing e...",
    votes: 0,
    category: "Technology",
    usage: 123
  },
  {
    id: 7, 
    header: "Prompt Header 7",
    content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    votes: 0,
    category: "Coding",
    usage: 234
  },
  {
    id: 8, 
    header: "Prompt Header 8",
    content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    votes: 0,
    category: "Homework",
    usage: 123
  },
  {
    id: 9, 
    header: "Prompt Header 9",
    content: "Prompt v1. Lorem ipsum dolor scing elit, sed doore magna aliqua...",
    votes: -2,
    category: "Education",
    usage: 123
  },
];

/* Retrieve all prompts */
app.get('/prompts', (req, res) => {
  const data = req.body
  res.send(prompts)
})

/* Retrieve prompt from id */
app.get('/prompts/:id', (req, res) => {
  const id = req.params.id
  result = prompts.find(prompt => prompt.id == id)
  if (result) {
    res.send(result)
  } else {
    res.send("No such prompt")
  }
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
  const newData = req.body;

  const promptToUpdate = prompts.find((prompt) => prompt.id == id);

  if (!promptToUpdate) {
    return res.status(404).json({ error: 'Prompt not found' });
  }
  
  if (newData.header !== undefined) {
    promptToUpdate.header = newData.header;
  }
  if (newData.content !== undefined) {
    promptToUpdate.content = newData.content;
  }
  if (newData.votes !== undefined) {
    promptToUpdate.votes = newData.votes;
  }
  if (newData.category !== undefined) {
    promptToUpdate.category = newData.category;
  }
  if (newData.usage !== undefined) {
    promptToUpdate.usage = newData.usage;
  }
  console.log(`Edited prompt with id: ${id} to vote: ${newData.votes}`)
  res.send(`edit prompt with id: ${id}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
