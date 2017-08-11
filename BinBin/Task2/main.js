;(function() {
  /*
  在注释下方编写代码
  遍历读取aqiData中各个城市的数据
  将空气质量指数大于60的城市显示到aqi-list的列表中
  */
  let aqiData = [
    ['北京', 90],
    ['上海', 50],
    ['福州', 10],
    ['广州', 50],
    ['成都', 90],
    ['西安', 100],
  ]
  ;(function() {
    aqiData.sort((a, b) => b[1] - a[1]).filter(v => v[1] > 60).map((v, _) => {
      let newLi = document.createElement('li')
      newLi.textContent = `第${['一', '二', '三', '四', '五', '六', '七', '八', '九'][
        _
      ]}名：${v[0]}，${v[1]}`
      document.getElementById('aqi-list').appendChild(newLi)
    })
  })()
})()
