//桁合わせ
function fitDigit(aNum,aDigit){
	var tNum=String(aNum)
	for(var i=0;i<aDigit;i++)
		tNum="0"+tNum
	return tNum.slice(-aDigit)
}
//複数のコールバックが全部帰ってきたら，コールバック
function waitForCallBacks(aCallBacks,aCallBack){
	var tCount=aCallBacks.length
	var tNotify=()=>{
		tCount--
		if(tCount==0)
			aCallBack()
	}
	for(var tCallBack of aCallBacks){
		tCallBack(tNotify)
	}
}
//inputの入力が条件を満たしているか
function isCorrect(aInput){
	//正規表現確認
	if(aInput.pattern!=null && !(new RegExp("^"+aInput.pattern+"$").test(aInput.value))){
		return false;
	}
	//入力必須
	if(aInput.required && aInput.value==""){
		return false;
	}
	//文字数
	if(aInput.maxlength<aInput.value.length){
		return false
	}
	switch (aInput.type) {
		case "text":
			return true;
			break;
		case "number":
			//数字出ない
			if(isNaN(aInput.value))
				return false;
			//最低値
			if(aInput.value<aInput.min)
				return false;
			//最大値
			if(aInput.max<aInput.value)
				return false;
			return true;
			break;
		default:
			return false;
	}
}
//dom取得
var getComponent;
function onLoad(aCallBack){
	var tFrame=document.getElementById("componentsFrame")
	getComponent=(aClassName)=>{
		return tFrame.contentWindow.getComponent(aClassName)
	}
	waitForCallBacks([
		(aCallBack)=>{
			tFrame.onload=aCallBack
		},
		// (aCallBack)=>{
		// 	ProgramDatabase.load(aCallBack)
		// }
	],()=>{
		aCallBack()
	})
}
