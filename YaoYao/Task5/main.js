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
    this.nx = 1
    this.ny = 1
    this.x = 1
    this.y = 1
    this.d = 0
    this.dList = ['TOP', 'RIG', 'BAC', 'LEF']
    this.boxDiv = document.createElement('div')
    this.boxDiv.innerHTML = '<div></div>'
    this.boxDiv.className = 'box TOP'
    this.boxDiv.style = 'top:50px;left:50px;'
    this.refresh()
  }

  static get dList() {
    return ['TOP', 'RIG', 'BAC', 'LEF']
  }

  /**
   * Return the box DOM element
   * @returns {HTMLDivElement}
   * @memberof Box
   */
  box() {
    return this.boxDiv
  }

  /**
   * Return the number of direction
   * @param {String} str
   * @return {Number}
   * @memberof Box
   */
  static direction(str) {
    return this.dList.indexOf(str)
  }

  /**
   * Refresh the style of box
   * @memberof Box
   */
  refresh() {
    let nd = this.dList.indexOf(this.boxDiv.className.split(' ')[1])
    this.boxDiv.className = 'box ' + this.dList[nd]
    this.boxDiv.style = `top: ${this.ny * 50 + 'px'};left: ${this.nx * 50 +
      'px'};animation: ${(params => {
      switch (params) {
        case 1:
          return 'clockwise-90'
        case 2:
          return 'clockwise-180'
        case 3:
          return 'anticlockwise-90'
      }
    })((this.d - nd + 4) % 4)} 1s forwards;`
    setTimeout(() => {
      this.boxDiv.className = 'box ' + this.dList[this.d]
      this.boxDiv.style = `top: ${this.y * 50 + 'px'};left: ${this.x * 50 +
        'px'};transition: 1s;`
    }, (this.d - nd + 4) % 4 == 0 ? 0 : 1000)
    this.nx = this.x
    this.ny = this.y
  }

  /**
   * Change the direction
   * @param {Number} direction
   * @param {Boolean} absolute
   * @memberof Box
   */
  turn(direction, absolute) {
    if (absolute) this.d = direction
    else this.d = (this.d + direction) % 4
  }

  /**
   * Go one step with direction
   * @param {Number} direction
   * @memberof Box
   */
  move(direction) {
    let x = this.x,
      y = this.y
    y += (direction - 1) % 2
    x -= (direction - 2) % 2
    if (x >= 1 && x <= height && y >= 1 && y <= width) {
      this.x = x
      this.y = y
    }
  }
}

let box = new Box()
table.appendChild(box.box())

control.innerHTML =
  '<input type="text" id="order"><input type="button" value="GO" id="orderBtn">'
let order = document.getElementById('order'),
  go = document.getElementById('orderBtn')

go.addEventListener('click', () => {
  let [o, d] = order.value.split(' ')
  if (o != 'TUN') box.move(Box.direction(d))
  if (o != 'TRA') box.turn(Box.direction(d), o != 'TUN')
  box.refresh()
})
