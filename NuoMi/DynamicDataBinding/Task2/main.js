/* eslint no-console: 0 */

/**
 * Dynamic Data Binding
 * @class Observer
 */
class Observer {
  /**
   * Creates an instance of Observer.
   * @param {Object} data
   * @memberof Observer
   */
  constructor(data) {
    const self = this
    this._emitters = {}
    Object.keys(data).forEach(key => {
      this._emitters[key] = new Emitter()
      if (typeof data[key] === 'object') data[key] = new Observer(data[key])
    })
    return new Proxy(data, {
      /**
       * A trap for getting property values.
       * @param {Object} target
       * @param {String} property
       * @returns
       */
      get(target, property) {
        return self[property] || target[property]
      },
      /**
       * A trap for setting property values.
       * @param {Object} target
       * @param {String} property
       * @param {any} value
       */
      set(target, property, value) {
        if (value !== target[property]) {
          target[property] =
            typeof value == 'object' ? new Observer(value) : value
          self._emitters[property].emit()
        }
      }
    })
  }
  /**
   * Add a watcher for the observer
   * @param {String} exp
   * @param {function} cb
   * @memberof Observer
   */
  $watch(exp, cb) {
    this._emitters[exp].addWatcher(new Watcher(this, exp, cb))
  }
}

/**
 * An observable than can have multiple
 * directives subscribing to it.
 * @class Emitter
 */
class Emitter {
  /**
   * Creates an instance of Emitter.
   * @memberof Emitter
   */
  constructor() {
    /** @type {Array.<Watcher>} */
    this.watchers = []
  }
  /**
   * Add a subscriber
   * @param {Watcher} sub
   * @memberof Emitter
   */
  addWatcher(sub) {
    this.watchers.push(sub)
  }
  emit() {
    this.watchers.forEach(watcher => watcher.update())
  }
}

/**
 * The watcher
 * @class Watcher
 */
class Watcher {
  /**
   * Creates an instance of Watcher.
   * @param {Observer} vm
   * @param {String} exp
   * @param {function} cb
   * @memberof Watcher
   */
  constructor(vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.value = this.get()
  }
  /**
   * Update the value and run the callback
   * @memberof Watcher
   */
  update() {
    const value = this.get()
    if (value !== this.value) {
      let preValue = this.value
      this.value = value
      this.cb.apply(this.vm, [this.value, preValue])
    }
  }
  /**
   * Get the value
   * @returns {any}
   * @memberof Watcher
   */
  get() {
    const value = this.vm[this.exp]
    return value
  }
}

let ob = new Observer({
  name: {
    lastName: 'a',
    firstName: 'b'
  },
  age: 100
})

ob.$watch('name', function(newVal, oldVal) {
  console.log(`Change name from ${oldVal} to ${newVal}`)
})

ob.name.$watch('lastName', function(newVal, oldVal) {
  console.log(`Change lastName from ${oldVal} to ${newVal}`)
})

ob.name.lastName = 'rat'
