class MyDate extends Date{
	getDayString(){
		switch (this.getDay()) {
			case 0:return "日"
			case 1:return "月"
			case 2:return "火"
			case 3:return "水"
			case 4:return "木"
			case 5:return "金"
			case 6:return "土"
		}
	}
	//翌日にする
	nextDate(){
		this.setDate(this.getDate()+1)
	}
	//次の指定した曜日にする
	nextDayOfWeek(aDay){
		let tToday=this.getDay()
		if(tToday<aDay){
			this.setDate(this.getDate()+(aDay-tToday))
		}else if(tToday>aDay){
			this.setDate(this.getDate()+(aDay+6-tToday))
		}
	}
	//次の指定した時間にする
	nextHours(aHour,aMinutes){
		aHour=Number(aHour)
		aMinutes=Number(aMinutes)
		if(aHour<=this.getHours()){
			if(aHour==this.getHours()){
				if(aMinutes<=this.getMinutes()){
					this.nextDate()
				}
			}else this.nextDate()
		}
		this.setHours(aHour,aMinutes,0,0)
	}
}
module.exports=MyDate
