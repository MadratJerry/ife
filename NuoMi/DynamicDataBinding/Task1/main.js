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
    Observer.observe(value)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log('You visit ' + key)
        return value
      },
      set(newValue) {
        console.log(`You set ${key}`)
        console.log(`New ${key} = ${newValue}`)
        if (newValue === value) return
        value = newValue
        Observer.observe(newValue)
      }
    })
  }
}

let data = {
  user: {
    name: 'crazymousethief',
    age: 100
  },
  country: 'China'
}

let ob = new Observer(data)
