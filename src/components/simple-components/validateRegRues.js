export const validatePhoneReg = /^1[\d]{10}$/
export const validatePassNotOnlyNumReg = /^\d{6,21}$/

export const validatePassReg = /^[\w]{6,21}$/
export const validatePassNotOnlyLetterReg = /^[A-Za-z]{6,21}$/
export const validatePhoneIsNumReg = /^[\d]*$/

export const validateMoneyReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/

// export const validateMoneyReg = /^(0|[1-9]\d{0,3})(\.\d{1,2})?$/

export const validateWeightReg = /^[\d]+$/
export const validateNumberReg = /^[\d]+$/

export const validatePassNotOnlyNum = (rule, value, callback) => {
  const reg = validatePassNotOnlyNumReg
  if (reg.test(value)) {
    callback(new Error('不能全为数字'))
  } else {
    callback()
  }
}

export const validatePassNotOnlyLetter = (rule, value, callback) => {
  const reg = validatePassNotOnlyLetterReg
  if (reg.test(value)) {
    callback(new Error('不能全为字母'))
  } else {
    callback()
  }
}

export const validatePass = (rule, value, callback) => {
  const reg = validatePassReg
  if (!reg.test(value)) {
    callback(new Error('6-21 位，只能是字母、数字和下划线'))
  } else {
    callback()
  }
}

export const validatePhoneIsNum = (rule, value, callback) => {
  const reg = validatePhoneIsNumReg
  if (!reg.test(value)) {
    callback(new Error('手机号码，只能是数字'))
  } else {
    callback()
  }
}

// 验证 手机号
export const validatePhone = (rule, value, callback) => {
  const reg = validatePhoneReg
  if (!reg.test(value)) {
    callback(new Error('请输入 11 位手机号'))
  } else {
    callback()
  }
}

// 验证 金钱
export const validateMoney = (rule, value, callback) => {
  const reg = validateMoneyReg
  if (!reg.test(value)) {
    callback(new Error('金钱格式错误'))
  } else {
    callback()
  }
}

// 验证重量数据
export const validateWeight = (rule, value, callback) => {
  const reg = validateWeightReg
  if (!reg.test(value)) {
    callback(new Error('重量格式错误'))
  } else {
    callback()
  }
}

// 验证个数数据
export const validateNumber = (rule, value, callback) => {
  const reg = validateNumberReg
  if (!reg.test(value) || value < 0) {
    callback(new Error('个数格式错误'))
  } else {
    callback()
  }
}

const moduleExports = {
  validatePhoneReg,
  validatePhone,

  validatePassNotOnlyNumReg,
  validatePassNotOnlyNum,

  validatePassReg,
  validatePass,

  validatePassNotOnlyLetterReg,
  validatePassNotOnlyLetter,

  validatePhoneIsNumReg,
  validatePhoneIsNum,

  validateMoneyReg,
  validateMoney,

  validateWeightReg,
  validateWeight,

  validateNumberReg,
  validateNumber
}

export default moduleExports
