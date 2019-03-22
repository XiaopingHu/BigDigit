## BigDigit
高精度加减乘除
数值表示如下：
将数字字符串或整数解析成整数数组，根据字符串的首字符判断是否是正负数，如果是非数字字符串则视为0处理；
加减乘除法都以数组的形式执行，结果返回为字符串表示；

#测试Demo，直接用浏览器打开即可
BigDigit.html

#使用
```js
var digit = new BigDigit('1234567890');
//加法
var result = digit.plus('987654321');
//减法
var result = digit.minus('987654321');
//乘法
var result = digit.multiply('987654321');
//除法，返回结果为对象：qt为商，rd为余数，如:{qt:'6',rd:'0'}
var result = digit.divide('987654321');
//求模
var result = digit.mod('987654321');
//两个数的比较，大于返回1，等于返回0，小于返回-1
var cp = digit.compare('123');
```