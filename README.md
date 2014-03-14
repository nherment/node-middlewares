
### install

    npm install --save middlewares

### basic usage

    var m = new Middlewares()

    m.use(function(obj, next) {
      // do stuff
      next()
    })

    m.use(function(obj, next) {
      // do stuff
      next()
    })

    m.use(function(obj, next) {
      // do stuff
      next()
    })

    m.execute({'hello': 'world'}, function(err) {
      // done
    })

### any number of arguments

    var m = new Middlewares()

    m.use(function(obj1, obj2, obj3, next) {
      // do stuff
      next()
    })

    m.use(function(obj1, obj2, obj3, next) {
      // do stuff
      next()
    })

    m.use(function(obj1, obj2, obj3, next) {
      // do stuff
      next()
    })

    m.execute({}, {}, {}, function(err) {
      // done
    })


### an error terminates the chain

    var m = new Middlewares()

    m.use(function(obj, next) {
      // do stuff
      next()
    })

    m.use(function(obj, next) {
      // do stuff
      next(new Error('eh'))
    })

    m.use(function(obj, next) {
      // Will not be executed
      next()
    })

    m.execute({}, function(err) {
      console.log(err.message) // 'eh'
    })

### pass an optional context to avoid creating closures

    var m = new Middlewares()

    this.doStuff = function(obj, next) {
      this.isUseful
      next()
    }

    m.use(this.doStuff, this)

    m.execute({'hello': 'world'}, function(err) {
      // done
    })

### export a wrapper

    var m = new Middlewares()

    m.use(function(obj, next) {
      // do stuff
      next()
    })

    m.use(function(obj, next) {
      // do stuff
      next()
    })

    var func = m.export()

    func(obj, function(err) {
      // do stuff
    })
