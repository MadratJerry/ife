const $ = str => document.querySelector(str)

HTMLElement.prototype.table = function(option = {}) {
  let config = {
    data: [],
    field: []
  }
  this.merge = function(a, b) {
    for (let item in b) a[item] = b[item]
  }
  this.merge(config, option)

  let table = document.createElement('table')
  let thead = document.createElement('thead')
  let tbody = document.createElement('tbody')

  this.innerHTML = ''
  this.appendChild(table)

  table.appendChild(thead)
  thead.appendChild(
    (() => {
      let tr = document.createElement('tr')
      config.field.forEach(item => {
        let fieldConfig = {
          sort(a, b, asc) {
            return asc
              ? a[fieldConfig.key] > b[fieldConfig.key]
              : a[fieldConfig.key] < b[fieldConfig.key]
          },
          key: '',
          sortable: true
        }
        let asc = true
        this.merge(fieldConfig, item)
        let td = document.createElement('td')
        td.textContent = fieldConfig.name
        td.className = fieldConfig.sortable ? 'sortable' : ''
        if (fieldConfig.sortable)
          td.addEventListener('click', () => {
            config.data.sort((a, b) => fieldConfig.sort(a, b, asc))
            asc = !asc
            this.updateTable()
          })
        tr.appendChild(td)
      })
      return tr
    })()
  )

  this.updateTable = function() {
    table.appendChild(tbody)
    tbody.innerHTML = ''
    config.data.forEach((item, index) => {
      let tr = document.createElement('tr')
      for (let field of config.field) {
        let td = document.createElement('td')
        if (field.fn != undefined)
          item[field.key] = field.fn(config.field, config.data, index)
        td.textContent = item[field.key]
        tr.appendChild(td)
      }
      tbody.appendChild(tr)
    })
  }

  this.updateTable()
  return this
}

$('#table').table({
  field: [
    { name: '姓名', key: 'name', sortable: false },
    { name: '语文', key: 'chinese' },
    { name: '数学', key: 'math' },
    { name: '英语', key: 'english' },
    {
      name: '总分',
      key: 'sum',
      fn(field, data, index) {
        return (
          data[index]['chinese'] + data[index]['math'] + data[index]['english']
        )
      },
      sort(a, b, asc) {
        if (a[this.key] == b[this.key]) return a['name'] < b['name']
        else return asc ? a[this.key] < b[this.key] : a[this.key] > b[this.key]
      }
    }
  ],
  data: [
    { name: '小明', chinese: 80, math: 90, english: 70 },
    { name: '小红', chinese: 90, math: 60, english: 90 },
    { name: '小亮', chinese: 60, math: 100, english: 70 }
  ]
})
