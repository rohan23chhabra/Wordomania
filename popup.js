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
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = xhr.responseText;
            console.log(res);
            let obj = JSON.parse(res);
            document.getElementById('bold-word').innerHTML = word.toUpperCase();
            document.getElementById('definition').innerHTML = obj.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
            document.getElementById('etymology').innerHTML = obj.results[0].lexicalEntries[0].entries[0].etymologies[0];
            document.getElementById('part-of-speech').innerHTML = obj.results[0].lexicalEntries[0].lexicalCategory;
            document.getElementById('language').innerHTML = obj.results[0].lexicalEntries[0].language;
        }
    };
    let url = 'http://localhost:8000/wordy?word=' + word;
    xhr.open('GET', url, true);
    xhr.send();
}