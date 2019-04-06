const electron = require('electron')
const app = electron.app
const Tray = electron.Tray
const image = electron.nativeImage
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const path = require('path')
const url = require('url')

const AlarmParDate=require("./script/alarm/AlarmParDate.js")
const AlarmParWeek=require("./script/alarm/AlarmParWeek.js")
const AlarmOnTime=require("./script/alarm/AlarmOnTime.js")
const ProgramDatabase=require("./script/neDatabase/ProgramDatabase")
const EventDatabase=require("./script/neDatabase/EventDatabase")
var mProgramDatabase;
var mEventDatabase;

var mScreenSize;
var mTray;
var mNoticeWindow;
var mEditorWindow;
var mAlarmWindows=[];
var mAlarmTimer;
var mAlarmPlans;
var mAlarmedPlans;
var mTimeOfSetted;

app.dock.hide()

app.on('ready', ()=>{
  //端末の画面サイズ
  mScreenSize=electron.screen.getPrimaryDisplay().workAreaSize;
  //メニューバーにアイコン追加
  createTray()
  //ファイル読み込み
  mProgramDatabase=new ProgramDatabase();
  mProgramDatabase.load("/Users/tomo/Library/myTools/11_plans/programs.db",()=>{
    mEventDatabase=new EventDatabase();
    mEventDatabase.load("/Users/tomo/Library/myTools/11_plans/events.db",()=>{
      setAlarmTimer()

      //通知ウィンドウ生成
      createNoticeWindow()

      //編集ウィンドウ生成
      // createEditorWindow()

      //アラームウィンドウ生成
      // createAlarmWindow()
    });
  });
  electron.powerMonitor.on("resume",()=>{
    reviewTimer()
  })
})
//通知ウィンドウ生成
function createNoticeWindow(){
  if(mNoticeWindow!=null){//既にウィンドウがあるなら閉じる
    mNoticeWindow.close()
    return;
  }
  mNoticeWindow = new BrowserWindow({width: 420, height: 520, x: mScreenSize.width, y: 0, transparent: true, frame: false, resizable:false, hasShadowcd:false, alwaysOnTop:true})
  mNoticeWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'window/notice/notice.html'),
    protocol: 'file:',
    slashes: true
  }))
  //ディベロッパーツール
  // mNoticeWindow.webContents.openDevTools()
  mNoticeWindow.on('closed', function () {
    electron.session.defaultSession.clearCache(() => {})
    mNoticeWindow = null;
  })
}
//エディタウィンドウ生成
function createEditorWindow(){
  if(mEditorWindow!=null){//既にウィンドウがあるなら閉じる
    mEditorWindow.close();
    return;
  }
  mEditorWindow = new BrowserWindow({width: 600, height: 600, transparent: true, frame: false, resizable:false, hasShadowcd:false})
  mEditorWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'window/editor/editor.html'),
    protocol: 'file:',
    slashes: true
  }))
  //ディベロッパーツール
  // mEditorWindow.webContents.openDevTools()
  mEditorWindow.on('closed', function () {
    electron.session.defaultSession.clearCache(() => {})
    mEditorWindow = null;
  })
}
//アラームウィンドウ生成
function createAlarmWindow(aPlan,aTime){
  let tAlarmWindowSize={width:250,height:200}
  let tEmptyIndex;
  //挿入するリストの位置を決める
  for(let i=0;i<mAlarmWindows.length;i++){
    if(mAlarmWindows[i]!=null)continue;
    tEmptyIndex=i;
    break;
  }
  if(tEmptyIndex==null)tEmptyIndex=mAlarmWindows.length
  //ウィンドウ生成
  let tAlarmWindow = new BrowserWindow({width: tAlarmWindowSize.width, height: tAlarmWindowSize.height, x: tEmptyIndex*tAlarmWindowSize.width, y: 0, transparent: true, frame: false, resizable:false, hasShadowcd:false, alwaysOnTop:true})
  tAlarmWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'window/alarm/alarm.html'),
    protocol: 'file:',
    slashes: true
  }))
  // tAlarmWindow.loadURL(__dirname+'/window/alarm/alarm.html')
  tAlarmWindow.webContents.on('dom-ready', ()=>{
    tAlarmWindow.send("sendArgument",{windowNum:tEmptyIndex,alarm:aPlan,time:aTime})
  });
  mAlarmWindows[tEmptyIndex]=tAlarmWindow
  //ディベロッパーツール
  // tAlarmWindow.webContents.openDevTools()
  tAlarmWindow.on('closed', function () {
    electron.session.defaultSession.clearCache(() => {})
    mAlarmWindows[tEmptyIndex]=null
  })
}
//アラームセット
function setAlarmTimer(){
  if(mAlarmTimer!=null)clearTimeout(mAlarmTimer)
  let tNextProgram=mProgramDatabase.getNextAlarmTime()
  let tNextEvent=mEventDatabase.getNextAlarmTime()
  if(tNextProgram==null&&tNextEvent==null)return
  if(tNextProgram==null)mAlarmPlans=tNextEvent
  else if(tNextEvent==null)mAlarmPlans=tNextProgram
  else{
    if(tNextProgram.time.getTime()<tNextEvent.time.getTime())mAlarmPlans=tNextProgram
    else if(tNextProgram.time.getTime()>tNextEvent.time.getTime())mAlarmPlans=tNextEvent
    else{
      mAlarmPlans=tNextProgram
      Array.prototype.push.apply(mAlarmPlans.plans,tNextEvent.plans)
    }
  }
  if(mAlarmTimer!=null)clearTimeout(mAlarmTimer)
  mTimeOfSetted=new Date()
  let tOffset=mAlarmPlans.time.getTime()-Date.now()
  if(tOffset<=0)return;
  mAlarmTimer=setTimeout(()=>{
    alarm()
  },tOffset)
}
//アラームを実行
function alarm(){
  let tPlans=mAlarmPlans
  for(let i=0;i<tPlans.plans.length;i++){
    createAlarmWindow(tPlans.plans[i],tPlans.time.getTime())
  }
  setAlarmTimer()
}
//タイマーを見直して設定し直す
function reviewTimer(){
  //経過した予定がないか確認
  let tProgram=mProgramDatabase.getAlarmInPeriod(mTimeOfSetted,new Date())
  let tEvent=mEventDatabase.getAlarmInPeriod(mTimeOfSetted,new Date())
  let tPlans=tProgram
  Array.prototype.push.apply(tPlans,tEvent)
  for(tPlan of tPlans){
    createAlarmWindow(tPlan,tPlan.getNextAlarmTime(mTimeOfSetted).getTime())
  }
  //タイマー再設定
  setAlarmTimer()
}
//メニューバーにアイコン追加
function createTray(){
  mTray = new Tray(image.createFromPath(__dirname+"/image/icon.png").resize({width:20,height:20}));
  var tTrayMenu=[
    { label: "通知", click:createNoticeWindow },
    { label: "編集", click:createEditorWindow },
  ]
  mTray.setContextMenu(Menu.buildFromTemplate(tTrayMenu));
  //ショートカットキー系
  var template = [{
    label: "Application",
    submenu: [
      { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
      { type: "separator" },
      // { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" },
      ]}
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  }

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//docIconクリック
app.on('activate', function () {
  createEditorWindow()
  if (mMainWindow === null) {
    createWindow()
  }
})
//noticeWindowを閉じる
ipcMain.on("closeNotice",(e,a)=>{
  createNoticeWindow()
})

//program
ipcMain.on("getAllProgram",(e,a)=>{
  e.sender.send(a.returnEvent,mProgramDatabase.getAllProgram())
})
ipcMain.on("getProgram",(e,a)=>{
  e.sender.send(a.returnEvent,mProgramDatabase.getById(a.id))
})
ipcMain.on("insertProgram",(e,a)=>{
  mProgramDatabase.insert(a.program,(res)=>{
    e.sender.send(a.returnEvent,res)
    setAlarmTimer()
  })
})
ipcMain.on("updateProgram",(e,a)=>{
  mProgramDatabase.update(a.id,a.program,(res)=>{
    e.sender.send(a.returnEvent,res)
    setAlarmTimer()
  })
})
ipcMain.on("removeProgram",(e,a)=>{
  mProgramDatabase.remove(a.id,(res)=>{
    e.sender.send(a.returnEvent,res)
    setAlarmTimer()
  })
})
//event
ipcMain.on("getAllEvent",(e,a)=>{
  e.sender.send(a.returnEvent,mEventDatabase.getAllEvent())
})
ipcMain.on("getEvent",(e,a)=>{
  e.sender.send(a.returnEvent,mEventDatabase.getById(a.id))
})
ipcMain.on("insertEvent",(e,a)=>{
  mEventDatabase.insert(a.event,(res)=>{
    e.sender.send(a.returnEvent,res)
    setAlarmTimer()
  })
})
ipcMain.on("updateEvent",(e,a)=>{
  mEventDatabase.update(a.id,a.event,(res)=>{
    e.sender.send(a.returnEvent,res)
    setAlarmTimer()
  })
})
ipcMain.on("removeEvent",(e,a)=>{
  mEventDatabase.remove(a.id,(res)=>{
    e.sender.send(a.returnEvent,res)
    setAlarmTimer()
  })
})
//予告取得
ipcMain.on("getNotice",(e,a)=>{
  e.sender.send(a.returnEvent,mProgramDatabase.getNotice())
})
//アラームウィンドウを閉じる
ipcMain.on("closeAlarm",(e,a)=>{
  mAlarmWindows[a.windowNum].close()
  mAlarmWindows[a.windowNum]=null
})
