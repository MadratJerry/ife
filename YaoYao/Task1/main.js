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

/**
 * Validate the form
 * @param {HTMLFormElement} form
 * @return {Boolean}
 */
function ValidateForm(form) {
  let length = GetStrLen(form.name.value)
  /** @type {HTMLOutputElement} */
  let info = form.info
  if (length == 0) {
    info.value = '名字不能为空'
    info.className = 'error'
    return false
  }
  if (length < 4 || length > 16) {
    info.value = '名称长度为4～16个字符'
    info.className = 'error'
    return false
  }
  info.value = '名称格式正确'
  info.className = 'correct'
  return true
}

window.myForm.btn.addEventListener('click', () => {
  ValidateForm(window.myForm)
})
