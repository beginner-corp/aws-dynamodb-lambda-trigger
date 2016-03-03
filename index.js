var async  = require('async')

// ok this looks a little crazy but I'm pretty sure it isn't
// create returns a trigger
module.exports = function createTrigger(type, event, context) {
  // test trigger event name
  function is(record, str) {
    var valid = ['INSERT', 'MODIFY', 'DELETE']
    return valid.indexOf(str) > -1 && record.eventName === str
  }
  // test for the type our trigger cares about
  function predicate(record) { 
    return is(record, type)
  }
  // trigger accepts a handler to invoke if the predicate is true
  return function trigger(handler) {
    // dynamo triggers send batches of records so we're going to create a handler for each one
    var handlers = event.Records.map(function(record) {
      // for each record we return a function that checks the predicate
      // if the predicate returns true we invoke the handler with the record
      // if not we just callback
      return function actualHandler(callback) {
        var invoking = predicate(record)
        if (invoking) {
          handler(record, callback)   
        }
        else {
          callback()
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
}

