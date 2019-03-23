/**
 * 高精度加减乘除
 * @author Xiaoping Hu
 * @date:2019-02-22
 */
 function BigDigit(n){
 	this.isPositive = true;
 	this.value = this.parseAsArray(n);
 }

 BigDigit.prototype = {
 	constructor:BigDigit,

 	parseAsArray:function(n){
 		var that = this, ns = [];
 		if (n.constructor == Array) {return n;}
 		if (typeof n === 'number') {n = n.toString();}
 		if (!/^(-|\+)?[1-9]\d*$/.test(n)) {return [0];}
 		if (n.charAt(0)=='-') {
 			that.isPositive = false;
 		}else if (n.charAt(0)=='+') {
 			that.isPositive = true;
 		}else{
 			that.isPositive = true;
 			ns.push(parseInt(n.charAt(0)));
 		}
 		for (var i = 1;i<n.length;i++) {
 			ns.push(parseInt(n.charAt(i)));
 		}
 		return ns;
 	},
 	isBigDigit:function(n){
 		return n.constructor == BigDigit;
 	},
 	compare:function(bd2){//数的比较，大于返回1，等于返回0，小于返回-1
 		var that = this;
 		if (!that.isBigDigit(bd2)) {
 			bd2 = new BigDigit(bd2);
 		}
 		if (that.isPositive&&bd2.isPositive) {
 			return that.compareArray(that.value,bd2.value);
 		}else if (that.isPositive&&!bd2.isPositive) {
 			return 1;
 		}else if(!that.isPositive&&bd2.isPositive){
 			return -1;
 		}else{
 			var ca = that.compareArray(that.value,bd2.value);
 			return ca==0?0:(ca==1?-1:1);
 		}
 	},
 	compareArray:function(n1,n2){//忽略正负地比较两个数组所对应的数的大小
 		if (n1.length>n2.length) {return 1;}
 		else if (n1.length==n2.length) {
 			for (var i = 0; i < n1.length; i++) {
 				if (n1[i]>n2[i]) {return 1;}
 				else if(n1[i]<n2[i]){return -1;}
 			}
 			return 0;
 		}else{return -1;}
 	},
 	plus:function(bd2){
 		var that = this;
 		if (!that.isBigDigit(bd2)) {
 			bd2 = new BigDigit(bd2);
 		}
 		if (bd2.isPositive&&that.isPositive) {//两个正数相加
 			return that.reverse(that.sum(that.value,bd2.value));
 		}else if (that.isPositive) {//第一个加数是正数，第二个是负数
 			return that.minus(bd2,true);
 		}else if (bd2.isPositive){//第一个加数是负数
 			return bd2.minus(that,true);
 		}else{//两个都是负数，都置为正数，执行加法，再将结果置为负数
 			return '-'+that.reverse(that.sum(that.value,bd2.value));
 		}

 	},
 	minus:function(bd2,isOpt){//减去bd2
 		var that = this;
 		if (!that.isBigDigit(bd2)) {
 			bd2 = new BigDigit(bd2);
 		}
 		if ((bd2.isPositive&&that.isPositive)||isOpt) {//两个正数相减
 			var cp = that.compareArray(that.value,bd2.value);//判断两个数的大小
 			if (cp==1) {
	 			return that.reverse(that.difference(that.value,bd2.value));
 			}else if(cp==0){
 				return '0';
 			} else{
 				return '-'+that.reverse(that.difference(bd2.value,that.value));
 			}
 		}else if (that.isPositive) {//第一个数是正数，第二个是负数
 			return that.reverse(that.sum(that.value,bd2.value));
 		}else if (bd2.isPositive) {//第一个数是负数，第二个是正数
 			return '-'+that.reverse(that.sum(that.value,bd2.value));
 		}else{//两个都是负数，被减数和减数对调
 			return bd2.minus(that,true);
 		}
 	},
 	multiply:function(bd2){
 		var that = this;
 		if (!that.isBigDigit(bd2)) {
 			bd2 = new BigDigit(bd2);
 		}
 		if (that.isPositive&&bd2.isPositive) {
 			return that.reverse(that.product(that.value,bd2.value));
 		}else{//两个都是负数,或有一个是负数
 			var f = that.isPositive||bd2.isPositive?'-':'';
 			return f+that.reverse(that.product(that.value,bd2.value));
 		}
 	},
 	divide:function(bd2){
 		var that = this;
 		if (!that.isBigDigit(bd2)) {
 			bd2 = new BigDigit(bd2);
 		}
 		if (that.isPositive&&bd2.isPositive) {
 			return that.quotient(that.value,bd2.value);
 		}else if (that.isPositive||bd2.isPositive) {
 			var result = that.quotient(that.value,bd2.value);
 			result.qt != '0'&&(result.qt = '-' + result.qt);
 			bd2.isPositive&&result.rd != '0'&&(result.rd = '-' + result.rd);//被除数为负数，余数也是负数
 			return result;
 		}else{//都是负数
 			var result = that.quotient(that.value,bd2.value);
 			result.rd != '0'&&(result.rd = '-' + result.rd);
 			return result;
 		}
 	},
 	mod:function(bd2){
 		return this.divide(bd2).rd;
 	},
 	subArray:function(src,st,len,dist){//截取数组从st开始的len个元素，如从st开始不足len个，则截取st之后的所有元素
 		dist = dist || [];
 		if (src.length<=st||len<=0) {return dist;}
 		for (var i = 0;st<src.length && i < len; i++,st++) {
 			dist.push(src[st]);
 		}
 		return dist;
 	},
 	reverse:function(array,type){//倒序输出数组,type为输出类型，可以试字符串0，可以试数组1，
 		var result;
 		type = type||0;
 		if (type==1) {
 			result = [];
 			for (var i = array.length - 1; i >= 0; i--) {
 				result.push(array[i]);
 			}
 		}else{
 			result = '';
		 	for (var i = array.length - 1; i >= 0; i--) {
		 		result+=array[i];
		 	}
 		}
	 	return result;
	 },
	 removeZeroPrefix:function(array,isRv){//移除数组中前缀为0的元素,isRv是否从右到左的方向起
	 	var k = 0;
	 	if (isRv) {
	 		k = array.length - 1;
			for (; k >= 0; k--) {
				if (array[k]!=0) break;
			}
			return this.subArray(array,0,k+1);
	 	}else{
	 		for (; k < array.length; k++) {
	 			if (array[k]!=0) break;
	 		}
	 		return k==array.length?[0]:this.subArray(array,k,array.length-k);
	 	}
	 	
	 },
	 sum:function(n1,n2,isRv){//求两个数组的和，isRv表示是否倒序，如：120在数组表示为[0,2,1]时，即表示倒序，默认不倒序，返回结果需要倒序输出，即由右往左输出
	 	var carry = 0,//进位数
	 	result = [];
	 	if (isRv) {
	 		var i=0,j=0;
	 		for (; i < n1.length||j<n2.length; ) {
	 			var s = (i<n1.length?n1[i++]:0)+(j<n2.length?n2[j++]:0)+carry;
				carry = parseInt(s/10);
				result.push(s%10);
	 		}
	 	}else{
	 		var i=n1.length-1,
			j=n2.length-1;
			for (;i>=0||j>=0;) {
				var s = (i>=0?n1[i--]:0)+(j>=0?n2[j--]:0)+carry;
				carry = parseInt(s/10);
				result.push(s%10);
			}
	 	}
		carry>0&&result.push(carry);
		return result;
	 },
	 difference:function(n1,n2){//求两个数组的差，返回结果需要倒序输出，即由右往左输出
	 	var i=n1.length-1,
		j=n2.length-1,
		borrow = 0,//借位数
		result = [];
		for (;j>=0;i--,j--) {
			var _n1 = n1[i],
			_n2 = n2[j];
			_n1<borrow?(_n1=9,borrow=2):(_n1-=borrow);//当前位小于借位数，说明当前位为0，借位为1，当前位需再向前一位借位减去后一位的借位，即为9，此时借位数应为2作为,否则正常减去后一位的借位
			_n1<_n2?(_n1+=10,borrow=1):(borrow==2?borrow=1:borrow=0);//完成上一步后，若_n1小于_n2,需要向前借位，此时borrow为1，否则borrow应为0，但当上一步_n1<borrow成立后，已向前借了一位，因此borrow还为1，否则为0
			var diff = _n1-_n2;
			result.push(diff);
		}
		for (;i>0;i--) {
			var _n1 = n1[i];
			_n1<borrow?(_n1+=(10-borrow),borrow=1):(_n1-=borrow,borrow=0);
			result.push(_n1);
		}
		var end = n1[i]-borrow;
		end>0&&result.push(end);
		return this.removeZeroPrefix(result,true);
	 },
	 product:function(n1,n2){//两个数组之积，返回结果需要倒序输出，即由右往左输出
	 	var that = this,
	 	i,carry,//进位
		j = n2.length - 1,
		k = 0,//每次结果初始补0个数
		result = [];
		for (; j >= 0; j--,k++) {
			var every = [];
			carry = 0;
			for (var l=0; l<k; l++) every.push(0);//补0
			for (i = n1.length-1; i >= 0; i--) {
				var p = n1[i]*n2[j]+carry;
				carry = parseInt(p/10);
				every.push(p%10);
			}
			carry>0&&every.push(carry);
			if (result.length>0) {
				result = that.sum(result,every,true);
			}else{result = every;}
		}
		return result;
	 },
	 quotient:function(n1,n2){//两个数组之商
	 	if (n2[0]==0) {return {qt:'0',rd:'0'};}
	 	var that = this,
	 	result = [],
		ca = that.compareArray(n1,n2);
		if (ca==-1) {return {qt:'0',rd:n1.join('')};}//如果n1小于n2，直接返回结果，qt为商，rd为余数
		else if (ca==0) {return {qt:'1',rd:'0'};}
		else{
			var st=0,_n1 = [],
			subLen = n2.length;
			while (st<n1.length) {
				that.subArray(n1,st,subLen,_n1);
				st +=subLen;
				_n1[0]==0&&_n1.length>1&&(_n1=that.removeZeroPrefix(_n1));//排除00的情况
				ca = that.compareArray(_n1,n2);
				if (ca==1) {
					var q = 2, 
					_n2 = that.reverse(that.product(n2,[q]),1), __n2=n2,
					_ca = that.compareArray(_n1,_n2);
					for (; _ca == 1;) {
						__n2 = _n2;
						_n2 = that.reverse(that.product(n2,[++q]),1);
						_ca = that.compareArray(_n1,_n2);
					}
					if(_ca==0){
						result.push(q);
						_n1 = [];
						subLen = n2.length;
						var zeroLen = (st+subLen>n1.length?n1.length-st:subLen)-1;
						for (var i = 0; i < zeroLen; i++)result.push(0);
					}else{
						result.push(q-1);
						_n1 = that.reverse(that.difference(_n1,__n2),1);
						subLen = 1;
					}
				}else if (ca==0) {
					result.push(1);
					_n1 = [];
					subLen = n2.length;
					var zeroLen = (st+subLen>n1.length?n1.length-st:subLen)-1;
					for (var i = 0; i < zeroLen; i++)result.push(0);
				}else{
					subLen=1;
					result.length>0 && result.push(0);
				}
			}
			return {qt:result.join(''),rd:_n1.join('')||'0'};
		}
	 }
 };