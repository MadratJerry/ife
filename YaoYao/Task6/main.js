const $ = str => document.querySelector(str)

HTMLElement.prototype.layer = function(option = {}) {
  let config = {
    width: 400,
    height: 200,
    titleContent: 'This is a layer',
    titleHeight: 30,
    content: 'This is a layer',
    confirm() {},
    cancel() {}
  }
  for (let item in option) config[item] = option[item]
  let title = document.createElement('div')
  let content = document.createElement('div')
  let bottom = document.createElement('div')
  let shadow = document.createElement('div')

  this.toggle = () => {
    let displayToggle = e => {
      if (e.style.display != 'none') e.style.display = 'none'
      else e.style.display = null
    }
    displayToggle(this)
    displayToggle(shadow)
  }

  document.body.insertBefore(shadow, this)
  shadow.style = `position: fixed;
  display: none;
  top: 0;
  left: 0;
  z-index: 0;
  height: 100%;
  width: 100%;
  background-color: #000;
  opacity: .2;`
  shadow.addEventListener('click', this.toggle)

  this.style = `width:${config.width}px;
    height:${config.height}px;
    margin: -${config.height / 2}px 0px 0px -${config.width / 2}px;
    top:50%;
    left:50%;
    background: white;
    position:fixed;
    border: 1px solid black;
    z-index: 1;
    display: none;`

  this.appendChild(title)
  title.style = `height: ${config.titleHeight}px;
  line-height: ${config.titleHeight}px;
  color: white;
  background: gray;
  border-bottom: 1px solid black;`
  title.textContent = config.titleContent

  this.appendChild(content)
  content.innerHTML = config.content

  this.appendChild(bottom)
  let confirm = document.createElement('button')
  let cancel = document.createElement('button')
  confirm.textContent = '确认'
  cancel.textContent = '取消'
  confirm.style = cancel.style = `float:right;
  margin: 10px;`
  confirm.addEventListener('click', () => {
    config.confirm()
    this.toggle()
  })
  cancel.addEventListener('click', () => {
    config.cancel()
    this.toggle()
  })
  bottom.appendChild(cancel)
  bottom.appendChild(confirm)
  bottom.style = `position:relative;
  margin-top:${config.height - config.titleHeight - 80}px;`

  return this
}

$('#layer')
  .layer({
    width: 400,
    height: 250
  })
  .toggle()
