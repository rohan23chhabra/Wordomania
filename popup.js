$(function () {
    $('#body-of-popup').hover(function () {
        pasteSelection();
    });
});

function pasteSelection() {
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, function (selection) {
        document.getElementById("word").value = selection[0];
        document.getElementById("bold-word").value = selection[0];
        setDetails(selection[0]);
    });
}

function setDetails(word) {

}