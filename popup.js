document.addEventListener('DOMContentLoaded', function () {
    var bg = chrome.extension.getBackgroundPage();
    var currentProtocol = bg.currentProtocol;
    var currentDomain = bg.currentDomain;
    var currentFullpath = bg.currentFullpath;
    var currentUrl = bg.currentUrl;
    var currentFolder = bg.currentFolder;
    var currentHost = bg.currentHost;
    var badgeText = bg.badgeText;
    var resp = bg.resp;

    chrome.storage.sync.get('savedApi', ({
            savedApi
        }) => {

        var domen = chrome.extension.getViews({
            type: "popup"
        });
        domen[0].document.getElementById("domen").innerHTML =
            "<a class=link href=https://" + savedApi + ".sistrix.com/" + currentDomain + " target=_blank>DOMAIN</a>";

        var host = chrome.extension.getViews({
            type: "popup"
        });
        host[0].document.getElementById("host").innerHTML =
            "<a class=link href=https://" + savedApi + ".sistrix.com/host/" + currentHost + " target=_blank>HOST</a>";

        var firstPath = chrome.extension.getViews({
            type: "popup"
        });
        firstPath[0].document.getElementById("firstPath").innerHTML =
            "<a class=l href=https://" + savedApi + ".sistrix.com/path/%22" + currentFolder[0] + "//" + currentHost + "/" + currentFolder[3] + "/%22 target=_blank>first path</a>";

        var secondPath = chrome.extension.getViews({
            type: "popup"
        });
        secondPath[0].document.getElementById("secondPath").innerHTML =
            "<a class=l href=https://" + savedApi + ".sistrix.com/path/%22" + currentFolder[0] + "//" + currentHost + "/" + currentFolder[3] + "/" + currentFolder[4] + "/%22 target=_blank>second path</a>";

        var thirdPath = chrome.extension.getViews({
            type: "popup"
        });
        thirdPath[0].document.getElementById("thirdPath").innerHTML =
            "<a class=l href=https://" + savedApi + ".sistrix.com/path/%22" + currentFolder[0] + "//" + currentHost + "/" + currentFolder[3] + "/" + currentFolder[4] + "/" + currentFolder[5] + "/%22 target=_blank>third path</a>";

        var fullpath = chrome.extension.getViews({
            type: "popup"
        });
        fullpath[0].document.getElementById("fullpath").innerHTML =
            "<a class=link href=https://" + savedApi + ".sistrix.com/path/%22" + currentFullpath + "/%22 target=_blank>FULL PATH</a>";

        var url = chrome.extension.getViews({
            type: "popup"
        });
        url[0].document.getElementById("url").innerHTML =
            "<a class=link href=https://" + savedApi + ".sistrix.com/url/%22" + currentUrl + "%22 target=_blank>URL</a>";

        var si = chrome.extension.getViews({
            type: "popup"
        });

        if (resp.indexOf("https://app.sistrix.com/sistrix/login") === 0) {

            si[0].document.getElementById("si").innerHTML =
                "<br /><a class=\"silink\" href=\"loginframe.html\">Sistrix login required!<br /><br />Please login!</a>";
        } else if (currentProtocol.indexOf("chrome") === 0) {
            si[0].document.getElementById("si").innerHTML =
                "<br /><a class=\"silink\">Zero Data</a>";
        } else {
            si[0].document.getElementById("si").innerHTML =
                "<a class=silink href=https://" + savedApi + ".sistrix.com/" + currentDomain + " target=_blank><br />" + currentDomain + "<br /><br />" + badgeText + "</a>";
        }

    })

})