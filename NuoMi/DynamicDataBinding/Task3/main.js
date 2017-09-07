/* eslint no-console: 0 */

/**
 * Quick object check
 * @param {any} obj
 * @returns {Boolean}
 */
function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

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
    this.$this = this
    this.$data = data
    this.$deps = {}
    this.$accessor = {}
    this.$parent = null
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'object') {
        this.$accessor[key] = new Observer(data[key])
        this.$accessor[key].$this.$parent = this
        this.$accessor[key].$this.$name = key
      }
    })
    return new Proxy(data, {
      /**
       * A trap for getting property values.
       * @param {Object} target
       * @param {String} property
       * @returns
       */
      get(target, property) {
        return self[property] || self.$accessor[property] || target[property]
      },
      /**
       * A trap for setting property values.
       * @param {Object} target
       * @param {String} property
       * @param {any} value
       */
      set(target, property, value) {
        if (value !== self.$accessor[property]) {
          target[property] = value
          if (typeof value === 'object')
            self.$accessor[property] = new Observer(value)
          self.$notify(property)
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
    ;(this.$deps[exp] || (this.$deps[exp] = new Dep()))
      .addSub(new Watcher(this, exp, cb))
    return this
  }
  /**
   * Notify the watcher to update
   * @param {String} key
   * @memberof Observer
   */
  $notify(key) {
    this.$deps[key].notify()
    return this.$parent ? this.$parent.$notify(this.$name) : this
  }
}

/**
 * An observable than can have multiple
 * directives subscribing to it.
 * @class Dep
 */
class Dep {
  /**
   * Creates an instance of Dep.
   * @memberof Dep
   */
  constructor() {
    /** @type {Array.<Watcher>} */
    this.subs = []
  }
  /**
   * Add a subscriber
   * @param {Watcher} sub
   * @memberof Dep
   */
  addSub(sub) {
    this.subs.push(sub)
  }
  /**
   * Notify the all watchers to update
   * @memberof Dep
   */
  notify() {
    this.subs.forEach(watcher => watcher.update())
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
    /** @type {Observer} */
    this.vm = vm
    /** @type {String} */
    this.exp = exp
    /** @type {Function} */
    this.cb = cb
    /** @type {Array.<Dep>} */
    this.deps = []
    this.value = this.get()
  }
  /**
   * Update the value and run the callback
   * @memberof Watcher
   */
  update() {
    const value = this.get()
    if (value !== this.value || isObject(value)) {
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
    const value = this.vm.$data[this.exp]
    return value
  }
  /**
   * Add a dep to deps array
   * @param {Dep} dep
   * @memberof Watcher
   */
  addDep(dep) {
    this.deps.push(dep)
  }
}

let data = {
  name: {
    lastName: 'a',
    firstName: 'b'
  },
  age: 100
}

let ob = new Observer(data)

ob.$watch('name', function() {
  console.log(`Name has changed`)
})

ob.name.$watch('lastName', function(newVal, oldVal) {
  console.log(`Change lastName from ${oldVal} to ${newVal}`)
})

ob.name.lastName = 'c'
