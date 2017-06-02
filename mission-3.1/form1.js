//可输错的最大次数
const errMAX = 3;
//初始输错次数
const initERR = 0;
//统计输错次数
let errNUM = initERR;
let eg = {};
eg.$ = function (id) {
    return document.getElementById(id);
};

eg.getElementsByClassName = function (className, element) {
    if(document.getElementsByClassName){
        return (element||document).getElementsByClassName(className);
    }
    let children = (element||document).getElementsByTagName("*");
    let elements = [];
    for(let i = 0;i<children.length;i++) {
        let child = children[i];
        let classNames = child.className.split(" ");
        for(let j = 0;j<classNames.length; j++) {
            if (child.classNames[j] === className) {
                elements.push(child);
                break;
            }
        }

    }
    return elements;
};

eg.addListener = function(target, evenType, handler){
    if(target.addEventListener){
        target.addEventListener(evenType,handler,false);
    } else if(target.attachEvent){
        target.attachEvent("on"+evenType, handler);
    } else{
        target["on"+evenType] = handler;
    }
}

eg.regCheck = function () {
    //检查密码与确认密码是否一致
    if(eg.$("pswdCheck").value.trim()!==eg.$("pswd").value.trim()){
        alert("密码与确认密码必须一致，请重新输入");
        eg.$("pswdCheck").value="";
        eg.$("pswd").value="";
        eg.$("pswd").focus();
        errNUM++;
        eg.lock();
        return false;
    }

    //检查邮箱的合法性
    let emailVal = eg.$("email").value.trim();
    let reg = new RegExp("^[a-z\\d]+[\\w\\-\\.]*@([a-z\\d]+[a-z\\d\\-]*\.)+[a-z]{2,4}$", "i");
    if(!reg.test(emailVal)){
        alert("请输入合法的邮箱");
        eg.$("email").value = "";
        eg.$("email").focus();
        errNUM++;
        eg.lock();
        return false;
    }

    //检查是否勾选爱好
    let hobby = eg.getElementsByClassName("hobby");
    let hobbyNUM = 0;
    Array.from(hobby).forEach(function (p) {
        if(p.checked){
            hobbyNUM++;
        }
    });
    if(hobbyNUM===0){
        alert("请至少选择一个爱好");
        errNUM++;
        eg.lock();
        return false;
    }


};
//检查是否要锁定
eg.lock = function () {
    if(errNUM>errMAX){
        eg.$("login").disabled = true;
        eg.$("lock").style.display = "block";
    }
};
//解锁
eg.unlock = function () {
    eg.$("login").disabled = false;
    eg.$("lock").style.display = "none";
    errNUM = initERR;
};

eg.addEvent = function () {
    let pwd = eg.$("pswd");
    eg.addListener(pwd,"keyup",function () {
        if(/^\d{1,}$/.test(pwd.value.trim())){
            eg.$("pswdLv").innerHTML = "弱";
            eg.$("pswDiv").style.backgroundColor = "#EA0000";
        } else if(/^\w{1,}$/.test(pwd.value.trim())){
            eg.$("pswdLv").innerHTML = "中";
            eg.$("pswDiv").style.backgroundColor = "coral";
        } else {
            eg.$("pswdLv").innerHTML = "强";
            eg.$("pswDiv").style.backgroundColor = "green";
        }
    })
};
eg.addEvent();

eg.addListener(eg.$("lock"), "click", eg.unlock)
