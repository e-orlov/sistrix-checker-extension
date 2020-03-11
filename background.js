var currentDomain = "";
var currentHost = "";
var currentFullpath = "";
var currentUrl = "";
var currentFolder = "";
var badgeText = "";

chrome.runtime.onInstalled.addListener(function(object) {
    if (chrome.runtime.OnInstalledReason.INSTALL === object.reason) {
        chrome.tabs.create({
            url: chrome.extension.getURL("welcome.html")
        }, function(tab) {
            console.log("New tab launched with instructions to use the extension");
        })
    }
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) run(tab);
});

chrome.tabs.onActivated.addListener(info => {
    chrome.tabs.get(info.tabId, run);
});

const processingTabId = {};

function run(tab) {
    if (processingTabId[tab.id]) return;
    processingTabId[tab.id] = true;

    let newUrl = new URL(tab.pendingUrl || tab.url)
    currentHost = newUrl.host;
    currentUrl = tab.url;
    currentFullpath = currentUrl.substring(0, currentUrl.lastIndexOf("/"));
    currentFolder = currentUrl.split("/");
    parsed = psl.parse(currentHost);
    currentDomain = parsed.domain;

    chrome.storage.sync.get('savedApi', ({
        savedApi
    }) => {

        var xhr = new XMLHttpRequest();
        var protocol = "https://";
        var middle = ".sistrix.com/seo/__loadModule/domain/"
        var end = "/mobile/1/_action/_data_visindex_normal/";

        xhr.open("GET", protocol + savedApi + middle + currentDomain + end, true);

        xhr.responseType = 'document';

        xhr.onreadystatechange = function() {

            if (this.readyState == 4 && xhr.status !== 500) {

                function getElementByXpath(path) {
                    return xhr.response.evaluate(path, xhr.response, null, XPathResult.STRING_TYPE, null).stringValue;
                }

                badgeText = getElementByXpath("normalize-space(//div[@class='data']/span[@class='value']/text())");
                chrome.browserAction.setBadgeText({
                    text: String(badgeText)
                });
                chrome.browserAction.setBadgeBackgroundColor({
                    color: '#1d2554'
                });

                if (badgeText == "") {
                    chrome.browserAction.setTitle({
                        title: "Sistrix login required!"
                    });

                } else {
                    chrome.browserAction.setTitle({
                        title: "Mobile visibility of " + currentDomain + " is " + String(badgeText)
                    });

                }

                delete processingTabId[tab.id];

            }
        }

        if (currentDomain !== null) {
            xhr.send();
        }

    })
}