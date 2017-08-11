;(function() {
  /*
            在注释下方写下代码
            给按钮button绑定一个点击事件
            在事件处理函数中
            获取aqi-input输入的值，并显示在aqi-display中
            */
  document.getElementById('button').addEventListener('click', function() {
    document.getElementById(
      'aqi-display'
    ).textContent = document.getElementById('aqi-input').value
  })
})()
