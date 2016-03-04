var async = require('async')

// createTrigger returns a trigger
function createTrigger(type, event, context, handler) {

  // dynamo triggers send batches of records so we're going to create a handler for each one
  var handlers = event.Records.map(function(record) {

    // for each record we construct a handler function
    return function actualHandler(callback) {
      
      // if isInvoking we invoke the handler with the record
      if (type === record.eventName) {
        handler(record, callback)   
      }
      else {
        callback() // if not we just call the continuation (callback)
      }
    }
  })

  // executes the handlers in parallel
  async.parallel(handlers, function done(err, results) {
    if (err) {
      context.fail(err)
    }
    else {
      context.succeed(results)
    }
  })
}

module.exports = {
  insert: createTrigger.bind({}, 'INSERT'),
  modify: createTrigger.bind({}, 'MODIFY'),
  delete: createTrigger.bind({}, 'DELETE')
}
