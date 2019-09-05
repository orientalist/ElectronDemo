//核心模組,控制應用程式生命週期與建立本地視窗
const { app, BrowserWindow } = require('electron')
const path = require('path')

//保持全域視窗參考
//否則當js物件被垃圾回收時,視窗關閉
let mainWindow

function createWindow() {
    //建立視窗
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            //設定視窗預載程序
            preload: path.join(__dirname, 'preload.js')
        }
    })

    //載入主要視窗
    mainWindow.loadFile('index.html')

    //打開開發工具
    mainWindow.webContents.openDevTools()

    //視窗關閉發動
    mainWindow.on('closed',function(){
        //一般而言會將視窗儲存於變數或陣列
        //於此時摧毀他們
        mainWindow=null
    })
}

//app.on()會在Electron準備好時發動
//他已經初始化好並準備建立視窗
//有些API只有在這之後才能調用
app.on('ready',createWindow)

//所有視窗關閉事件
app.on('window-all-closed',function(){
    if(process.platform!=='darwin') app.quit()
})

app.on('active',function(){
    //macOS當dock icon點擊時會重開視窗 而不是 開新視窗
    if(mainWindow===null) createWindow()
})