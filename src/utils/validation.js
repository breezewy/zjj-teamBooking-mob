/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 整数
 * @param {*} s
 */
export function isInteger (s) {
  return /^([1-9]\d*|[0]{1,1})$/.test(s)
}



