/**
 * Get the string length which has Chinese character
 * @param {String} str
 * @return {Number}
 */
function GetStrLen(str) {
  let length = 0
  for (let c of str) c.codePointAt(0) <= 0xff ? length++ : (length += 2)
  return length
}

/** @type {HTMLFormElement} */
let form = window.myForm

let formNodes = {
  名称: [
    '必填，长度为4～16个字符',
    'text',
    str => {
      let length = GetStrLen(str)
      if (length == 0) return { success: false, str: '名称不能为空' }
      if (length < 4 || length > 16)
        return { success: false, str: '长度应在4～16个字符之间' }
      return { success: true, str: '名称可用' }
    }
  ],
  密码: [
    '必填，长度为4～16个字符',
    'password',
    str => {
      let length = GetStrLen(str)
      if (length == 0) return { success: false, str: '密码不能为空' }
      if (length < 4 || length > 16)
        return { success: false, str: '长度应在4～16个字符之间' }
      return { success: true, str: '密码合法' }
    }
  ],
  密码确认: [
    '再次输入相同密码',
    'password',
    str => {
      if (str.length == 0) return { success: false, str: '密码不能为空' }
      else if (form['密码'].value == str) return { success: true, str: '密码合法' }
      else return { success: false, str: '两次密码不一致' }
    }
  ],
  邮箱: [
    '填写正确的邮箱地址',
    'text',
    str => {
      if (
        /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
          str
        )
      )
        return { success: true, str: '邮箱格式正确' }
      else return { success: false, str: '邮箱格式错误' }
    }
  ],
  电话: [
    '填写正确的手机号码',
    'text',
    str => {
      if (/^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/.test(str))
        return { success: true, str: '电话格式正确' }
      else return { success: false, str: '电话格式错误' }
    }
  ]
}

/** @type {HTMLInputElement[]} */
let inputList = []
/** @type {Boolean} */
let success = true
for (let item in formNodes) {
  let newDiv = document.createElement('div')
  newDiv.innerHTML = `<label for="${item}">${item}</label>
        <input type="${formNodes[item][1]}" name="${item}">
        <output name="${item + 'validate'}" for="${item}"></output>`
  form.appendChild(newDiv)

  let input = newDiv.childNodes[2],
    output = newDiv.childNodes[4]
  inputList.push(input)
  input.addEventListener('focus', () => {
    output.textContent = formNodes[item][0]
    output.className = ''
  })
  input.addEventListener('blur', () => {
    let result = formNodes[item][2](input.value)
    if (result == null) return
    input.className = output.className = result.success ? 'correct' : 'error'
    output.textContent = result.str
    success = result.success
  })
}

let submit = document.createElement('input')
form.appendChild(submit)
submit.type = 'button'
submit.value = '提交'
submit.addEventListener('click', () => {
  inputList.forEach(item => {
    var event = new MouseEvent('blur', {
      view: window,
      bubbles: true,
      cancelable: true
    })
    item.dispatchEvent(event)
  })
  if (!success) alert('输入有误')
})
