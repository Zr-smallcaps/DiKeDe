
export const  imgError =  {
    inserted( el , { value } ){
            // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
        console.log(value)
        el.onerror=function(){
          el.src=value
        }
     }
}      