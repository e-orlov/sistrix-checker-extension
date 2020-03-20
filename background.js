var currentDomain = "";
var currentHost = "";
var currentFullpath = "";
var currentUrl = "";
var currentFolder = "";
var badgeText = "";
var currentProtocol = "";
var resp = "";

chrome.runtime.onInstalled.addListener(function (object) {
    if (chrome.runtime.OnInstalledReason.INSTALL === object.reason) {
        chrome.tabs.create({
            url: chrome.extension.getURL("welcome.html")
        }, function (tab) {})
    }
})

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {

        run(tab.pendingUrl || tab.url);

        if (!(currentProtocol) || currentProtocol.indexOf("chrome") === 0) {

            chrome.browserAction.setBadgeText({
                text: "ZERO"
            });
        }

    });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.active && change.url) {

        run(change.url);
    }
});

function run(param) {

    let newUrl = new URL(param);
    currentHost = newUrl.host;
    currentUrl = newUrl.toString();
    currentProtocol = newUrl.protocol;

    currentFullpath = currentUrl.substring(0, currentUrl.lastIndexOf("/"));
    currentFolder = currentUrl.split("/");
    parsed = psl.parse(currentHost);
    currentDomain = parsed.domain;

    if (currentDomain && currentProtocol.indexOf("http") === 0) {

        chrome.storage.sync.get('savedApi', ({
                savedApi
            }) => {

            if (savedApi == undefined) {
                savedApi = "de";
            }

            var xhr = new XMLHttpRequest();
            var protocol = "https://";
            var middle = ".sistrix.com/seo/__loadModule/domain/"
                var end = "/mobile/1/_action/_data_visindex_normal/";

            xhr.open("GET", protocol + savedApi + middle + currentDomain + end, true);

            xhr.responseType = 'document';

            xhr.onreadystatechange = function () {

                resp = xhr.responseURL;

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

                    if (resp.indexOf("https://app.sistrix.com/sistrix/login") === 0) {
                        chrome.browserAction.setTitle({
                            title: "Sistrix login required!"
                        });

                    } else {
                        chrome.browserAction.setTitle({
                            title: "Mobile visibility of " + currentDomain + " is " + String(badgeText)
                        });

                    }

                }

            }

            xhr.send();

        })
    }
}