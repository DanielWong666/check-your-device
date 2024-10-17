'use strict';

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

const userOs = select('.os');
const userLanguage = select('.language');
const userBrowser = select('.browser');
const pageWidth = select('.width');
const pageHeight = select('.height');
const pageOrientation = select('.orientation');
const batteryLevel = select('.level');
const batteryStatus = select('.status');
const networkStatus = select('.network');
const networkColor = select('.box-three');

// Information of SYSTEM- OS
function getOS() {
    const userAgent = navigator.userAgent;
    let os;
    let osDetected = true;

    switch (osDetected) {
        case userAgent.indexOf("Win") !== -1:
            os = "Windows";
            break;
        case userAgent.indexOf("Mac") !== -1:
            os = "MacOS";
            break;
        case userAgent.indexOf("Android") !== -1:
            os = "Android";
            break;
        case userAgent.indexOf("like Mac") !== -1:
            os = "iOS";
            break;
        default:
            os = "Unknown OS"; 
    }
    return os;
}

userOs.innerText = `OS: ${getOS()}`;


// Information of SYSTEM- language

function getLanguage() {
    return navigator.language || navigator.userLanguage;
}

userLanguage.innerText = `Language: ${getLanguage()}`;

// Information of SYSTEM- browser
function getBrowser() {
    const userAgent = navigator.userAgent;
    let browser = "Unknown Browser";

    if (userAgent.indexOf("Chrome") !== -1) browser = "Chrome";
    else if (userAgent.indexOf("Firefox") !== -1) browser = "Firefox";
    else if (userAgent.indexOf("Safari") !== -1) browser = "Safari";
    else if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident") !== -1) browser = "Internet Explorer";
    else if (userAgent.indexOf("Edge") !== -1) browser = "Edge";
    return browser;
}

userBrowser.innerText = `Browser: ${getBrowser()}`;

// Information of WINDOW
function readWindow() {
    pageWidth.innerText = `Width: ${window.innerWidth}px`;
    pageHeight.innerText = `Height: ${window.innerHeight}px`;
    
    let orientation;
    if (window.matchMedia("(orientation: landscape)").matches) {
        orientation = 'Landscape';
    } else {
        orientation = 'Portrait';
    }
    pageOrientation.innerText = `Orientation: ${orientation}`;
}

listen('load', window, () => {
    readWindow();
});

listen('resize', window,() => {
    readWindow();
});

// Information of BATTERY
function updateBatteryInfo(battery) {
    batteryLevel.innerText = `Level: ${Math.round(battery.level * 100)}%`
    batteryStatus.innerText = `Status: ${battery.charging ? "charging" : "idle"}`
}

if (navigator.getBattery) {
    navigator.getBattery().then(function(battery) {
        updateBatteryInfo(battery);
        
        battery.addEventListener('levelchange', function() {
            updateBatteryInfo(battery);
        });
        battery.addEventListener('chargingchange', function() {
            updateBatteryInfo(battery);
        });
    });
} else {
    batteryLevel.innerText = "Level: not available";
    batteryStatus.innerText = "Status: not available";
}

// Information of NETWORK
function updateNetworkStatus() {
    const onlineStatus = navigator.onLine ? "Online" : "Offline";
    networkStatus.innerText = `${onlineStatus}`;
    if (navigator.onLine) {
        networkColor.style.backgroundColor = '#00a84f';
    } else {
        networkColor.style.backgroundColor = '#a83500';
    }
}

updateNetworkStatus();

window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);