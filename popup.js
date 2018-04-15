$(function () {
    $('#body-of-popup')
        .hover(function () {
            pasteSelection();
        });
});
let requestCompleted = false;
function pasteSelection() {
    chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
        },
        function (selection) {
            document.getElementById("word").value = selection[0];
            document.getElementById("bold-word").value = selection[0];
            setDetails(selection[0]);
        });
}

function setDetails(word) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200 && requestCompleted === false) {
            requestCompleted = true;
            let res = xhr.responseText;
            console.log(res);
            let obj = JSON.parse(res);
            document.getElementById('bold-word').innerHTML = word.toUpperCase();
            document.getElementById('definition')
                .appendChild(makeUL(obj.results[0].lexicalEntries[0].entries[0].senses[0].definitions));

            document.getElementById('etymology').innerHTML = obj.results[0].lexicalEntries[0].entries[0].etymologies[0];
            document.getElementById('part-of-speech').innerHTML = obj.results[0].lexicalEntries[0].lexicalCategory;
            document.getElementById('language').innerHTML = obj.results[0].lexicalEntries[0].language;
        }
    };

    let app_id = '39e44a1d';
    let app_key = '7659768a10f8611c001df1b4a054be9e';
    let language = 'en';
    let url = 'https://od-api.oxforddictionaries.com:443/api/v1/entries/' + language + '/' + word.toLowerCase();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('app_id', app_id);
    xhr.setRequestHeader('app_key', app_key);
    xhr.send();
}

function makeUL(array) {
    let list = document.createElement('ul');
    for (let i = 0; i < array.length; i++) {
        let item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i]));
        list.appendChild(item);
    }
    return list;
}