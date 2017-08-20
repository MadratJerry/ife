/** @type {HTMLBodyElement} */
let rootBox = document.getElementById('root'),
  previous = null
/** @type {HTMLBodyElement[]} */
let animationOrder = []
/** @type {HTMLButtonElement[]} */
let buttonList = ['Delete', 'Search', 'Traversal', 'Add']

buttonList.forEach(item => {
  document.getElementById(item + 'Btn').addEventListener('click', window[item])
})

/**
 * DFS the DOM box tree
 * @param {HTMLBodyElement} root
 * @param {function} fn
 */
function DFS(root, fn) {
  root.childNodes.forEach(e => {
    if (e.nodeType == 1 && e.className == 'box') {
      fn(e)
      DFS(e, fn)
    }
  }, this)
}

/**
 * Add Event Listener for element
 * @param {HTMLBodyElement} node
 */
function BindSelect(node) {
  node.addEventListener(
    'click',
    event => {
      if (previous) previous.classList.toggle('select')
      node.classList.toggle('select')
      previous = node
      event.stopPropagation()
    },
    false
  )
}

function Refresh() {
  animationOrder = []
  DFS(rootBox, e => {
    BindSelect(e)
    animationOrder.push(e)
  })
}

Refresh()

/**
 * Delete the DOM node
 * @param {HTMLBodyElement} node
 */
function DeleteNode(node) {
  if (node != null) {
    node.parentNode.removeChild(node)
    Refresh()
  }
}

function Delete() {
  DeleteNode(previous)
  previous = null
  Refresh()
}

function Add() {
  const str = document.getElementById('input-add').value
  const newNode = document.createElement('div')
  newNode.className = 'box'
  newNode.textContent = str
  BindSelect(newNode)

  if (previous) previous.appendChild(newNode)
  else rootBox.appendChild(newNode)

  Refresh()
}

function Search() {
  const str = document.getElementById('input-search').value
  const pattern = new RegExp('(' + str + ')', 'g')
  animationOrder.forEach(element => {
    element.childNodes.forEach(item => {
      if (item.nodeName == 'SPAN') {
        item.innerHTML = item.textContent.replace(pattern, '<i>$1</i>')
      }
    })
  }, this)
}

/**
 * Play the animation
 * @param {Number} index
 */
function Play(index) {
  let top = animationOrder[index]
  if (previous) previous.classList.toggle('select')
  if (top == null) {
    previous = null
    return
  }
  top.classList.toggle('select')
  previous = top

  setTimeout(() => Play(--index), 1000)
}

function Traversal() {
  Play(animationOrder.length - 1)
}
