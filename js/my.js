/**
 * Created by master on 01.03.16.
 */

var myListItems;
var myNewItem =
{
    "name": "sedassdasd",
    "owner": "lorempixel.com",
    "added": (new Date()).toLocaleDateString(),
    "numOfTags": 9,
    "src": "http://lorempixel.com/200/200"
};

function createListElementForContentItem(akt) {
    var item = akt;
    var li = document.createElement("li");

    var divleft = document.createElement("div");
    divleft.setAttribute("class", "left-part");
    li.appendChild(divleft);

    var img = document.createElement("img");
    img.src = item.src;
    divleft.appendChild(img);

    var divoption2 = document.createElement("div");
    divoption2.setAttribute("class", "button option2");
    divleft.appendChild(divoption2);

    var divtop = document.createElement("div");
    divtop.setAttribute("class", "topdiv");
    li.appendChild(divtop);

    var h2r = document.createElement("h2");
    h2r.textContent = item.added;
    h2r.setAttribute("class", "right-part");
    divtop.appendChild(h2r);

    var h2 = document.createElement("h2");
    h2.textContent = item.owner;
    divtop.appendChild(h2);

    var h3 = document.createElement("h3");
    h3.textContent = item.name;
    divtop.appendChild(h3);

    var divbottom = document.createElement("div");
    divbottom.setAttribute("class", "bottomdiv");
    li.appendChild(divbottom);

    var divplay = document.createElement("div");
    divplay.setAttribute("class", "button play");
    divbottom.appendChild(divplay);

    var divoption = document.createElement("div");
    divoption.setAttribute("class", "button option");
    divbottom.appendChild(divoption);

    var tags = document.createElement("h2");
    tags.textContent = item.numOfTags;
    //tags.setAttribute("class", "button play");
    divbottom.appendChild(tags);

    // add the element to the list
    var listroot = document.getElementsByTagName("ul")[0];
    listroot.appendChild(li);
}

function loadNewItems() {

    // we initiate an xmlhttprequest and read out its body
    xhr("GET","data/listitems.json",null,function(xhr) {
        var textContent = xhr.responseText;
        console.log("loaded textContent from server: " + textContent);
        var jsonContent = JSON.parse(textContent);

        // we assume jsonContent is an array and iterate over its members
        jsonContent.forEach(createListElementForContentItem);

    });

}

function createNewItems(){
    myListItems.forEach(createListElementForContentItem);
}

// Ansicht zwischen Liste und Kacheln umschalten
/* ist jetzt in jsl durch fadein und fadeout
function switchView(){
    var mainDiv = document.getElementById("mainDiv");

    if(mainDiv.getAttribute("class") == "main myListView"){
        mainDiv.className="main myThumbView";
    }else{
        mainDiv.className="main myListView";
    }
}*/

window.addEventListener('DOMContentLoaded', loadNewItems);

function reload(){
    location.reload(true);
}

function addItem(){
    createListElementForContentItem(myNewItem);
}

// addListeners onload
window.onload = function() {
    // Reload Liste
    document.getElementsByClassName("button refresh")[0].addEventListener("click", reload);
    // Add Item
    document.getElementsByClassName("button new-item")[0].addEventListener("click",addItem);
    // alert Titel bei Klick auf li
    document.getElementById('liste').addEventListener("click",onListItemSelected);
}
