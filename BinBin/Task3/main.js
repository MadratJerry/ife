/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 * @return {Array}
 */
function getData() {
  /*
    coding here
    */

  /*
    data = [
        ["北京", 90],
        ["北京", 90]
        ……
        ]
    */
  let data = []
  for (let v of document.getElementById('source').childNodes) {
    if (v.nodeType === 1) {
      data.push([
        v.firstChild.textContent.substr(0, 2),
        v.lastChild.textContent,
      ])
    }
  }
  return data
}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 * @param {Array} data
 * @return {Array}
 */
function sortAqiData(data) {
  return data.sort((a, b) => a[1] - b[1])
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 * @param {Array} data
 */
function render(data) {
  data.map((v, _) => {
    let newLi = document.createElement('li')
    newLi.textContent = `第${['一', '二', '三', '四', '五', '六', '七', '八', '九'][
      _
    ]}名：${v[0]}，${v[1]}`
    document.getElementById('resort').appendChild(newLi)
  })
}

/**
 * btnHandle
 * 处理按钮点击事件
 */
function btnHandle() {
  var aqiData = getData()
  aqiData = sortAqiData(aqiData)
  render(aqiData)
}

/**
 * init
 * 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
 */
function init() {
  document.getElementById('sort-btn').onclick = btnHandle
}

init()
