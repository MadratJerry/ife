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
    Object.keys(data).forEach(key => {
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
        console.log(`Visit ${property}`)
        return target[property]
      },
      /**
       * A trap for setting property values.
       * @param {Object} target
       * @param {String} property
       * @param {any} value
       */
      set(target, property, value) {
        console.log(`Change ${property} = ${value}`)
        target[property] =
          typeof value == 'object' ? new Observer(value) : value
      }
    })
  }
}

let ob = new Observer({
  name: {
    lastname: 'a',
    firstname: 'b'
  },
  age: 100
})

ob.name
ob.age = 101
