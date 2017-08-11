let previous = null,
  animationOrder = [],
  orders = ['pre', 'in', 'post'],
  buttonList = []

function preOrder(element) {
  if (element != null) {
    animationOrder.push(element)
    preOrder(element.firstElementChild)
    preOrder(element.lastElementChild)
  }
}

function inOrder(element) {
  if (element != null) {
    preOrder(element.firstElementChild)
    animationOrder.push(element)
    preOrder(element.lastElementChild)
  }
}

function postOrder(element) {
  if (element != null) {
    preOrder(element.firstElementChild)
    preOrder(element.lastElementChild)
    animationOrder.push(element)
  }
}

function play() {
  let top = animationOrder.pop()
  if (previous) previous.classList.toggle('select')
  if (top == null) return
  top.classList.toggle('select')
  previous = top

  setTimeout(function() {
    play()
  }, 1000)
}

orders.forEach(function(element) {
  document
    .getElementById(element + 'OrderBtn')
    .addEventListener('click', () => {
      window[element + 'Order'](document.getElementsByClassName('root')[0])
      play()
    })
}, this)
