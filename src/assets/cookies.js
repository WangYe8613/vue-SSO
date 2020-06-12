// 下面的接口都是直接使用vue的库实现的，无需深入了解，只需知道它们的作用即可

// 在cookie中指定key，设置value以及过期时间
export function setCookie(c_name,value,expire) {
    var date=new Date()
    date.setSeconds(date.getSeconds()+expire)
    document.cookie=c_name+ "="+escape(value)+"; expires="+date.toGMTString()
}

// 从cookie中获取指定key的值
export function getCookie(c_name){
    if (document.cookie.length>0){
        let c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1){
            c_start=c_start + c_name.length+1
            let c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

// 从cookie中删除指定key及其对应的value
export function delCookie(c_name){
    setCookie(c_name, "", -1)
}