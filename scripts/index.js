function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function pad(myNum, size) {
    var s = String(myNum);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
}

var sessionStart;
var sessionKey;
var thisParam1;
var uniqueID;

if ((thisParam1 = getUrlParameter("ID"))) {
    sessionStart = thisParam1;
} else {
    sessionStart = pad(Date.now(), 16);
    sessionKey = Math.floor(Math.random() * 1000);
    sessionKey = pad(sessionKey, 4);
}

uniqueID = sessionStart + "_" + sessionKey;

var pageString = "obtainConsent.html?ID=";
var finalURL = pageString + uniqueID.toString();

document.getElementById("idBox").value = uniqueID;
document.getElementById("exp_button1").onclick = (ev) => {
    window.location.href = finalURL;
};
