const express = require('express')
const cors = require('cors');
const AWS = require('aws-sdk');
const app = express()
const port = 3000

app.use(cors());
app.use(express.json())

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// temporary mock data for prompts
/* var prompts = [
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
]; */

/* Retrieve all prompts */
app.get('/prompts', (req, res) => {
  const params = {
    TableName: 'prompts',
  };

  dynamodb.scan(params, (err, data) => {
    if (err) {
      console.error("Error retrieving prompts: ", err);
      res.status(500).json({ error: "An error occurred while retrieving prompts." });
    } else {
      const prompts = data.Items;
      res.json(prompts);
    }
  });
})

/* Retrieve prompt from id */
app.get('/prompts/:id', (req, res) => {

  const id = req.params.id

  const params = {
    TableName: 'Prompts',
    Key: { id: parseInt(id) },
  };

  dynamodb.get(params, (err, data) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Failed to retrieve item from DynamoDB' });
    } else {
      res.send(data.Item);
    }
  });
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

  const params = {
    TableName: 'prompts',
    Key: { id: parseInt(id) },
    UpdateExpression: 'set #votes = :votes',
    ExpressionAttributeNames: {
      '#votes': 'votes'
    },
    ExpressionAttributeValues: {
      ':votes': parseInt(newData.votes)
    },
    ReturnValues: 'UPDATED_NEW',
  };

  // Update the item in DynamoDB
  dynamodb.update(params, (err, data) => {
    if (err) {
      console.error('Error updating prompt:', err);
      return res.status(500).json({ error: 'Failed to update prompt' });
    } else {
      console.log(`Updated prompt with ID: ${id}`);
      return res.json({ message: `Updated prompt with ID: ${id}` });
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
