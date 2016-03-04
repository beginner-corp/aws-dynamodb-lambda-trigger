# aws-dynamodb-lambda-trigger

Cleans up the code you need to run a DynamoDB trigger on AWS Lambda. 

```javascript
var trigger = require('aws-dynamo-lambda-triggger')

// regular lambda fn business here
exports.handler = function myLambdaTriggerForTableName(event, context) {

  // register a handler for inserts
  trigger.insert(event, context, function handleInsert(record, callback) {
    console.log(record)
    callback()
  })

  // register a handler for updates (modify, in dynamo streams parlance)
  trigger.modify(event, context, function handleModify(record, callback) {
    console.log(record)
    callback()
  })

  // register a handler for delete
  trigger.delete(event, context, function handleDelete(record, callback) {
    console.log(record)
    callback()
  })

}
```
