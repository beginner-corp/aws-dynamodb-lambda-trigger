# aws-dynamodb-lambda-trigger

cleans up the code you need to run a dynamo trigger on lambda

```
var createTrigger = require('aws-dynamo-lambda-triggger')

exports.handler = function myLambdaTrigger(event, context) {

  // get a listener for inserts
  var insert = createTrigger('INSERT', event, context)
  
  // register a handler for inserts
  insert(function handleInsert(record, callback) {
    console.log(record)
    callback()
  })
}
```
