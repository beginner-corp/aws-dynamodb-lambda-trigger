var test = require('tape')
var trigger = require('.')

test('sanity', t=> {
  t.plan(4)
  t.ok(trigger, 'the thing')
  t.ok(trigger.insert, 'the thing can listen for insert')
  t.ok(trigger.modify, 'the thing can listen for modify')
  t.ok(trigger.delete, 'the thing can listen for delete')
})

test('can queue things', t=> {
  var e = {
    eventName: 'INSERT',
    Records: [{}]
  }
  var ctx = {
    succeed(thing) {
      t.ok(thing, 'got a thing from insert')
      console.log('success called', thing)
      t.end()
    }, 
    fail(thing) {
      console.log('fail called', thing)
      t.end()
    }
  }
  trigger.insert(e, ctx, function handler(record, callback) {
    callback()
  })
})
