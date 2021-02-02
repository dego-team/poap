export function getUrlParams(urlStr: string) {
  let url: string
  if (typeof urlStr === 'undefined') {
    url = decodeURI(window.location.search)
  } else {
    url = '?' + urlStr.split('?')[1]
  }
  var theRequest: any = {}
  var strs: any
  if (url.indexOf('?') !== -1) {
    var str = url.substr(1)
    strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
    }
  }
  return theRequest
}

export const balanceFormat = function (balance: number | string, digitNum: number, fixedNum: number) {
  if (!balance) return '0.00'
  balance = String(balance)
  if (String(balance).length <= digitNum) {
    let supplyZeroNum = digitNum - String(balance).length
    let decimalPoint = '0.'
    for (let i = 0; i < supplyZeroNum; i++) {
      decimalPoint += '0'
    }
    balance = decimalPoint + balance
  } else {
    let after = balance.slice(String(balance).length - digitNum, String(balance).length)
    let before = balance.slice(0, String(balance).length - digitNum)
    balance = before + '.' + after
  }

  return Number(balance).toFixed(fixedNum)
}
