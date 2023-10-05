const express = require('express')
const app = express()
const port = 3000

// Middleware function requestTime
const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

// Route to get data
app.get('/getData', (req, res) => {
  const data = 'Hello World';
  res.send(data);
});

// Route to push data to somewhere else
app.post('/pushData', (req, res) => {
  const newData = req.body; // send data in the request body
  res.send('Data successfully pushed to somewhere else.');
});

// Route to update existing data
app.put('/updateData/:id', (req, res) => {
  const itemId = req.params.id; // pass the ID in the route parameters
  res.send(`Data with ID ${itemId} successfully updated.`);
});

// Route to delete data
app.delete('/deleteData/:id', (req, res) => {
  const itemId = req.params.id; //pass the ID in the route parameters
  res.send(`Data with ID ${itemId} successfully deleted.`);
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
