let previous = null,
  animationOrder = [],
  buttonList = []

function traversal(element) {
  if (element != null) {
    element.childNodes.forEach(e => {
      if (e.nodeType == 1) traversal(e)
    }, this)
    animationOrder.push(element)
  }
}

function play() {
  let top = animationOrder.pop()
  if (previous) previous.classList.toggle('select')
  if (top == null) return
  top.classList.toggle('select')
  previous = top

  setTimeout(() => play(), 1000)
}

document.getElementById('TraversalBtn').addEventListener('click', () => {
  traversal(document.getElementsByClassName('root')[0])
  play()
})
