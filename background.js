// background.js

let color = "#3aa757";
let battery = null;





chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    // chrome.extension.getUrl('popup.html');
    console.log('Default Background color set to %cgreen', `color: ${color}`);
});
// chrome.action.setBadgeText({ text: `${battery}%` });
//chrome.action.setBadgeBackgroundColor({ color });