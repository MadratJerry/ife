const c1 = document.getElementById('c1'),
  c2 = document.getElementById('c2'),
  student_c1 = document.getElementById('student_c1'),
  student_c2 = document.getElementById('student_c2'),
  city = document.getElementById('city'),
  school = document.getElementById('school')
student_c1.addEventListener('click', () => {
  c1.hidden = false
  c2.hidden = true
})
student_c2.addEventListener('click', () => {
  c2.hidden = false
  c1.hidden = true
})

let city_school = {
  北京: ['北京大学', '清华大学'],
  上海: ['上海交通大学']
}

for (let item in city_school) {
  let newOption = document.createElement('option')
  newOption.textContent = item
  newOption.addEventListener('change', () => {})
  city.appendChild(newOption)
}
city.addEventListener('change', () => {
  let cityName = city.options[city.selectedIndex].textContent
  school.innerHTML = ''
  city_school[cityName].forEach(item => {
    let newOption = document.createElement('option')
    newOption.textContent = item
    school.appendChild(newOption)
  })
})
var event = new MouseEvent('change', {
  view: window,
  bubbles: true,
  cancelable: true
})
city.dispatchEvent(event)
