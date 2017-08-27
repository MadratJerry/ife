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
    this.data = data
    this.walk(data)
  }
  /**
   * Recursive assignment
   * @param {Object} value
   * @memberof Observer
   */
  walk(value) {
    Object.keys(value).forEach(key => this.convert(key, value[key]))
  }
  /**
   * Convert the Object to Observer
   * @param {String} key
   * @param {Object} value
   * @memberof Observer
   */
  convert(key, value) {
    Observer.defineReactive(this.data, key, value)
  }
  /**
   *
   * @static
   * @param {Object} value
   * @returns {Observer}
   * @memberof Observer
   */
  static observe(value) {
    if (typeof value === 'object') return new Observer(value)
  }
  /**
   * Bind the object getter and setter
   * @static
   * @param {Object} obj
   * @param {String} key
   * @param {Object} value
   * @memberof Observer
   */
  static defineReactive(obj, key, value) {
    let dep = new Dep()
    Observer.observe(value)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (Dep.target) dep.addSub(Dep.target)
        console.log('You visit ' + key)
        return value
      },
      set(newValue) {
        console.log(`You set ${key}`)
        console.log(`New ${key} = ${newValue}`)
        if (newValue === value) return
        value = newValue
        Observer.observe(newValue)
        dep.notify()
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
    new Watcher(this, exp, cb)
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
   * Notify the all subscriber
   * @memberof Dep
   */
  notify() {
    this.subs.forEach(sub => sub.update())
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
   * Update value and run the callback
   * @memberof Watcher
   */
  update() {
    const value = this.get()
    if (value !== this.value) {
      let preValue = this.value
      this.value = value
      this.cb.call(this.vm.data, ...[this.value, preValue])
    }
  }
  /**
   * Get the value
   * @returns
   * @memberof Watcher
   */
  get() {
    Dep.target = this
    const value = this.vm.data[this.exp]
    Dep.target = null
    return value
  }
}

let app = new Observer({
  name: 'crazymosuethief',
  age: 20
})

app.data.name = {
  lastName: 'Hong',
  firstName: 'Yotau'
}

app.data.name.lastName
app.data.name.firstName = 'YO'

app.$watch('age', age => {
  console.log(`My age has changed to ${age}`)
})

app.data.age = 100
