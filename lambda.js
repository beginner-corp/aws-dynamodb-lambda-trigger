var trigger = require('./')
/**
 * var trigger = require('aws-dynamodb-lambda-trigger/lambda')
 *
 * function onInsert(event, callback) {
 *   console.log(event)
 *   callback() 
 * }
 *
 * module.exports = trigger.insert(onInsert)
 */
function __trigger(type, handler) {
  return function __lambdaSignature(evt, ctx) {
    trigger[type](evt, ctx, handler)
  }
}

module.exports = {
  insert: __trigger.bind({}, 'insert'),
  modify: __trigger.bind({}, 'modify'),
  remove: __trigger.bind({}, 'remove'),
     all: __trigger.bind({}, 'all'),
    save: __trigger.bind({}, 'save'),
  change: __trigger.bind({}, 'change')
}
