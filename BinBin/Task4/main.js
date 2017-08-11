;(function(id) {
  let _id,
    _bindedElement,
    o = {}
  Object.defineProperties(o, {
    id: {
      get: function() {
        return _id
      },
      set: function(v) {
        _id = v
        _bindedElement = document.getElementById(v)
      },
    },
    bindedElement: {
      get: function() {
        return _bindedElement
      },
    },
  })
  ;['push', 'unshift', 'pop', 'shift'].forEach((name, _) => {
    o[name] = function(...e) {
      if (_ > 1) e = [0]
      for (let i of typeof e === 'number' ? [e] : e) {
        let newDiv = document.createElement('div')
        newDiv.className = 'box'
        newDiv.textContent = i
        newDiv.onclick = function() {
          this.parentNode.removeChild(this)
        }
        switch (name) {
          case 'push':
            o.bindedElement.appendChild(newDiv)
            break
          case 'unshift':
            o.bindedElement.insertBefore(newDiv, o.bindedElement.firstChild)
            break
          case 'pop':
          case 'shift':
            let delEle =
              o.bindedElement[name == 'shift' ? 'firstChild' : 'lastChild']
            if (delEle === null) break
            alert(delEle.textContent)
            o.bindedElement.removeChild(delEle)
            break
        }
      }
    }
    document.getElementById(name).onclick = function() {
      let value = document.getElementById('input').value
      if (!isNaN(value)) o[name](value)
    }
  })
  o.id = id
})('list')
