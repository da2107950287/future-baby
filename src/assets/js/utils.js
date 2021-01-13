/* 判断是否是微信 */
export function is_wexin() {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  }
  return false;
}
/* 验证手机号 */
export function isPhone(phone) {
  let isPhone = /^[1][0-9][0-9]{9}$/;//手机号码
  if (!isPhone.test(phone)) {
    return false;
  };
  return true;
}
export function isEmail(value, callback) {
  const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
  if (value == '' || value == undefined || value == null) {
    return false;
  } else {
    if (!reg.test(value)) {
      return false;
    } else {
      return true;
    }
  }
}
/* 是否为空 */
export function isEmpty(str) {
  if (typeof (str) != "undefined" && str != null && str != '') {
    return false;
  }
  return true;
}
//判断方法是否为空
function isEmptyObject(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}
//格式化日期
export function formatDate(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;
}
export function setStore(key, value) {
  window.localStorage.setItem(key, value);
}

export function getStore(key) {
  return window.localStorage.getItem(key);
}
export function chineseLetter(arr, dataLeven) {
  var letter = 'abcdefghjklmnopqrstwxyz'.split('')
  var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('')
  /* 获取数组元素比较的值 */
  function getValue(option) {
    if (!dataLeven) return option
    var data = option
    dataLeven.split('.').filter(function (item) {
      data = data[item]
    })
    return data + ''
  }
  /* 进行排序 */
  arr.sort(function (item1, item2) {
    return getValue(item1).localeCompare(getValue(item2), 'zh-Hans-CN')
  })
  /* 判断需要排序的字符串是否含有中文字符 */
  if (/[\u4e00-\u9fff]/.test(getValue(arr[0])) && typeof arr[0] === 'object') {
    pySegSort(0, 0);
    return arr
  }
  /* 给省列表中添加首字符 */
  function pySegSort(letterIndex, zhIndex) {
    var first = true // 首次是否加 字母标识
    for (var i = zhIndex; i < arr.length; i++) {
      var item = arr[i]
      //      是否有值 && 当前值大于等于本次字母的最小值 && (最后一位 || 当前值小于下次字母的最小值)
      var state = zh[letterIndex] && getValue(item).localeCompare(zh[letterIndex], 'zh') >= 0 && (letterIndex === letter.length - 1 || getValue(item).localeCompare(zh[letterIndex + 1], 'zh') < 0)
      if (state) { // 满足条件，同一个首字母下的：例如 A 下的所有省份
        if (first) { //是否是第一次出现
          item.letter = letter[letterIndex].toUpperCase()
          first = false
        } else {
          item.letter = ''
        }
      } else { // 递归调用 函数，进行下次字母下的排列
        letterIndex++
        if (letterIndex < letter.length) {
          pySegSort(letterIndex, i)
          break
        }
      }
    }
  }
}
export function getRequest() {
  var url = window.location.href; //获取url中"?"符后的字串
  console.log(url)
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);//unescape()要解码或反转义的字符串
    }
  }
  return theRequest;
}
export function debounce(fn, delay) {
  var timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  }
}
