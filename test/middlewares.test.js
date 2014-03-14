
var Middlewares = require('../Middlewares.js')

var assert = require('assert')

describe('middlewares', function() {


  it('no middleware, no args', function() {

    var m = new Middlewares()

    m.execute()


  })

  it('no middleware, one callback arg', function(done) {

    var m = new Middlewares()

    m.execute(done)

  })

  it('1 middleware', function(done) {

    var m = new Middlewares()
    var middlewareCalled = false
    m.use(function(obj, next) {
      assert.ok(obj)
      assert.equal(obj.hello, 'world')
      middlewareCalled = true
      next()
    })

    m.execute({'hello': 'world'}, function() {
      assert.ok(middlewareCalled, 'middleware was not called')
      done()
    })

  })

  it('3 middlewarea', function(done) {

    var m = new Middlewares()
    var middlewareCalled = {
      count: 0,
      first: false,
      second: false,
      third: false
    }

    m.use(function(obj, next) {
      middlewareCalled.count ++
      assert.ok(obj)
      assert.equal(obj.hello, 'world')
      obj.first = true
      middlewareCalled.first = true
      next()
    })

    m.use(function(obj, next) {
      middlewareCalled.count ++
      assert.ok(obj)
      assert.equal(obj.hello, 'world')
      assert.ok(obj.first)
      obj.second = true
      middlewareCalled.second = true
      next()
    })

    m.use(function(obj, next) {
      middlewareCalled.count ++
      assert.ok(obj)
      assert.equal(obj.hello, 'world')
      assert.ok(obj.second)
      obj.third = true
      middlewareCalled.third = true
      next()
    })

    m.execute({'hello': 'world'}, function() {
      assert.ok(middlewareCalled.first, 'middleware was not called')
      assert.ok(middlewareCalled.second, 'middleware was not called')
      assert.ok(middlewareCalled.third, 'middleware was not called')
      assert.equal(middlewareCalled.count, 3)
      done()
    })

  })

  it('3 middlewarea', function(done) {

    var m = new Middlewares()
    var middlewareCalled = {
      count: 0,
      first: false,
      second: false,
      third: false
    }

    m.use(function(obj, next) {
      middlewareCalled.count ++
      assert.ok(obj)
      assert.equal(obj.hello, 'world')
      obj.first = true
      middlewareCalled.first = true
      next()
    })

    m.use(function(obj, next) {
      middlewareCalled.count ++
      assert.ok(obj)
      assert.equal(obj.hello, 'world')
      assert.ok(obj.first)
      obj.second = true
      middlewareCalled.second = true
      next(new Error('custom error message'))
    })

    m.use(function(obj, next) {
      done(new Error('should not have been called'))
    })

    m.execute({'hello': 'world'}, function(err) {
      assert.ok(err)
      assert.equal(err.message, 'custom error message')
      assert.ok(middlewareCalled.first, 'middleware was not called')
      assert.ok(middlewareCalled.second, 'middleware was not called')
      assert.ok(!middlewareCalled.third, 'middleware was called')
      assert.equal(middlewareCalled.count, 2)
      done()
    })

  })

  it('context is maintained', function(done) {

    var m = new Middlewares()
    var middlewareCalled = false

    var ctx = {
      timestamp: Date.now(),
      func: function(obj, cb) {
        obj.timestamp = this.timestamp
        cb()
      }
    }

    m.use(ctx.func, ctx)

    var obj = {}
    m.execute(obj, function() {
      assert.equal(obj.timestamp, ctx.timestamp)
      done()
    })

  })

})
