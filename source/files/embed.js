//Mobile Start
function checkMobile() {
    var isiPad = navigator.userAgent.match(/iPad/i) != null;
    if (isiPad) {
        return false;
    }
    var isMobile = navigator.userAgent.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i) != null;
    if (isMobile) {
        return true;
    }
    return false;
}
//Mobile End
//Admin Start
function sskadmin(e) {
    var ssk = '';
    if (e.user_id == 6290130919810401026) {
        if (checkMobile()) {
            ssk = '<span class="this_ua sskadmin">R00T</span><br><br>';
        } else {
            ssk = '<span class="this_ua sskadmin">R00T</span>';
        }
    } else {
        if (checkMobile()) {
            ssk = '<br><br>';
        }
    }
    return ssk;
}
//Admin End
//UA Start
 function show_ua(string){
        console.log(string)
        $.ua.set(string);
        var sua=$.ua;
        if(sua.os.version=='x86_64')sua.os.version='x64';
        if (checkMobile()) {
        return '<span class="this_ua platform '+sua.os.name+'">'+sua.os.name+' '+sua.os.version+'</span><br><br><span class="this_ua browser '+sua.browser.name+'">'+sua.browser.name+' '+sua.browser.version+'</span>';
        } else { 
        return '<span class="this_ua platform '+sua.os.name+'">'+sua.os.name+' '+sua.os.version+'</span><span class="this_ua browser '+sua.browser.name+'">'+sua.browser.name+' '+sua.browser.version+'</span>';
        }
    }
//UA End
