// 防抖
export function debounce(fn, delay, that) {
 
    var delay = delay || 200;
    var timer;
    return function () {
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(that, args);
        }, delay);
    };
}
// 节流
export function throttle(fn, interval) {
    var last;
    var timer;
    var interval = interval || 200;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
}