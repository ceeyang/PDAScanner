/**
 * 设备判断
 */
export const inBrowser = typeof window !== 'undefined';
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
export const isIE = UA && /msie|trident/.test(UA);
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
export const isEdge = UA && UA.indexOf('edge/') > 0;
export const isAndroid = UA && UA.indexOf('android') > 0;
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

/**
 * URL请求https类型判断
 */
export const isHttpsUrl = url => {
    url = url ? url.toLowerCase() : '';
    if (url.indexOf('https://') == 0) {
        return true;
    } else {
        return false;
    }
};

/**
 * URL请求http类型判断
 */
export const isHttpUrl = url => {
    url = url ? url.toLowerCase() : '';
    if (url.indexOf('http://') == 0) {
        return true;
    } else {
        return false;
    }
};
