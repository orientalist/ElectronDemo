//將需要的Node.js APIs透過preload.js載入
//擁有與Chrome extension一樣的沙盒
window.addEventListener('DOMContentLoaded',()=>{
    //Dom載入後方法,更改Dom文字
    const replaceText=(selector,text)=>{
        const element=document.getElementById(selector)
        if(element) element.innerText=text
    }

    for(const type of ['chrome','node','electron']){
        replaceText(`${type}-version`,process.versions[type])
    }
})