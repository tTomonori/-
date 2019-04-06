class PastTab extends Tab{
	static openTab(){
		//タブの順番設定
		ScheduleTab.closeTab()
		CustomTab.closeTab()
		ScheduleTab.setTabOrder(2)
		CustomTab.setTabOrder(1)
		this.setTabOrder(3)
		this.recreateContent()
	}
}
PastTab.init("past")
