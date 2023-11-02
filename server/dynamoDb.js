const AWS = require('aws-sdk');

// Configure AWS access credentials
AWS.config.update({
//   region: 'us-east-1',
  accessKeyId: 'DUMMYIDEXAMPLE',
  secretAccessKey: 'DUMMYEXAMPLEKEY',
});

// create a DynamoDB service object
const dynamodb = new AWS.DynamoDB();

// define table parameters
const params = {
  TableName: 'PromptsLibrary',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }, // Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'N' }, // 'S' represents a string data type
    { AttributeName: 'header', AttributeType: 'S' }, 
    { AttributeName: 'contents', AttributeType: 'S' },
    { AttributeName: 'votes', AttributeType: 'N' },
    { AttributeName: 'category', AttributeType: 'S' },
    { AttributeName: 'usage', AttributeType: 'N' },// 'N' represents a number data type
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

// create a table
dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error:', err);
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});