const table = document.createElement('table'),
  control = document.createElement('div'),
  container = document.getElementsByClassName('container')[0]
container.appendChild(table)
container.appendChild(control)

const width = 10,
  height = 10

// Create the table
table.innerHTML = ((width, height) => {
  let tableHTML = '<tr><td></td>',
    trHTML = ''
  for (let i = 1; i <= width; i++) {
    tableHTML += `<td>${i}</td>`
    trHTML += '<td></td>'
  }
  tableHTML += '</tr>'
  for (let i = 1; i <= height; i++)
    tableHTML += `<tr><td>${i}</td>` + trHTML + '</tr>'
  return tableHTML
})(width, height)

/**
 * Contorl the box on the screen
 * @class Box
 */
class Box {
  constructor() {
    this.x = 1
    this.y = 1
    this.d = 0
    this.boxDiv = document.createElement('div')
    this.boxDiv.innerHTML = '<div></div>'
    this.boxDiv.className = 'box'
    this.Refresh()
  }

  /**
   * Return the box DOM element
   * @returns {HTMLDivElement}
   * @memberof Box
   */
  Box() {
    return this.boxDiv
  }

  /**
   * Refresh the style of box
   * @memberof Box
   */
  Refresh() {
    this.boxDiv.style = `top: ${this.y * 50 + 'px'};left: ${this.x * 50 +
      'px'};transform:rotate(${this.d * 90}deg)`
  }

  /**
   * Change the direction
   * @param {Number} direction -1 LEFT 1 RIGHT 2 BACK
   * @memberof Box
   */
  Turn(direction) {
    this.d = (this.d + direction + 4) % 4
  }

  /**
   * Go one step foward
   * @memberof Box
   */
  Foward() {
    let x = this.x,
      y = this.y
    y += (this.d - 1) % 2
    x -= (this.d - 2) % 2
    if (x >= 1 && x <= height && y >= 1 && y <= width) {
      this.x = x
      this.y = y
    }
  }
}

let box = new Box()
table.appendChild(box.Box())

control.innerHTML =
  '<input type="text" id="order"><input type="button" value="GO" id="orderBtn">'
let order = document.getElementById('order'),
  go = document.getElementById('orderBtn')

go.addEventListener('click', () => {
  switch (order.value) {
    case 'TUN LEF':
      box.Turn(-1)
      break
    case 'TUN RIG':
      box.Turn(1)
      break
    case 'TUN BAC':
      box.Turn(2)
      break
  }
  box.Foward()
  box.Refresh()
})
